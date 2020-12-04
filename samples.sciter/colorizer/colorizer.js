
export function colorize() 
{
	const isEditor = this.tag == "plaintext";
  
  // forward declarations:
  var doStyle;
  var doScript;

  // markup colorizer  
  function doMarkup(tz) 
  {
		var tagStart = null; // [node,offset]
		var tagScript = false;
		var tagScriptType = false;
		var tagStyle = false;
		var textElement;

    var tt;
      
    while(tt = tz.nextToken()) {
      if( isEditor && tz.element != textElement )       
      {
         textElement = tz.element;
         textElement.setAttribute("type","markup");
      }
      //stdout.println(tt,tz.attr,tz.value);
      switch(tt) {
        case "tag-start": {    
            tagStart = tz.tokenRange.start;
            const tag = tz.markupTag;
            tagScript = tag == "script";
            tagStyle  = tag == "style";
          } break;
        case "tag-head-end": {
            (new Range(tagStart,tz.tokenRange.end)).highlight("tag");
            if( tagScript ) { tz.push(tagScriptType,"</script>"); doScript(tz, tagScriptType, true); }
            else if( tagStyle ) { tz.push("text/css","</style>"); doStyle(tz, true); }
          } break;
        case "tag-end":      tz.tokenRange.highlight("tag"); break;  
        case "tag-attr":     if( tagScript && tz.markupAttributeName == "type") tagScriptType = tz.markupAttributeValue; 
                            if( tz.markupAttributeName == "id" ) tz.tokenRange.highlight("tag-id"); 
                            break;
      }
    }
  }
 
  // script colorizer
  doScript = function(tz, typ, embedded = false) 
  {
    const KEYWORDS = 
    {
      "function":true, "var"     :true,"if"       :true,
      "else"    :true, "while"   :true, "return"    :true,"for"      :true,
      "break"   :true, "continue":true, "do"        :true,"switch"   :true,
      "case"    :true, "default" :true, "null"      :true,"super"    :true,
      "new"     :true, "try"     :true, "catch"     :true,"finally"  :true,
      "throw"   :true, "typeof"  :true, "instanceof":true,"in"       :true,
      "let"     :true, "const"   :true, "get"       :true,"set"      :true,
      "include" :true, "like"    :true, "class"     :true,"of"       :true,
      "this"    :true, "delete"  :true, "with"      :true,"extends"  :true, 
      "await"   :true, "async"   :true, "yield"     :true,"import"   :true,  
      "export"  :true,  
    };
      
    const LITERALS = { "true": true, "false": true, "null": true, "undefined": true };
    
    var firstElement = null;
    var lastElement = null;

    var tt;
   
    loop: while(tt = tz.nextToken()) {
      var el = tz.element;
      firstElement = firstElement || el;
      lastElement = el;
      switch(tt) 
      {
        case "number":      tz.tokenRange.highlight("number"); break; 
        case "number-unit":  tz.tokenRange.highlight("number-unit"); break; 
        case "string":      tz.tokenRange.highlight("string"); break;
        case "name": // name token         
        {
          var val = tz.tokenValue;
          if(KEYWORDS[val]) 
            tz.tokenRange.highlight("keyword"); 
          else if(LITERALS[val]) 
            tz.tokenRange.highlight("literal"); 
          break;
        }
        case "comment": tz.tokenRange.highlight("comment"); break;
        case "island-end":  
          // got </script>
          tz.pop(); //pop tokenizer layer
          break loop;
      }
    }
    if(isEditor && embedded) {
      for( var el = firstElement; el; el = el.nextElementSibling ) {
        if( el == lastElement )
          break;
        el.setAttribute("type","script");
      }
    }
  };
  
  doStyle = function(tz, embedded = false) 
  {
    const KEYWORDS = 
    {
      "rgb":true, "rgba":true, "url":true, "var":true, 
      "@import":true, "@media":true, "@set":true, "@const":true,
      "@mixin":true, "@supports":true,
    };
      
    const LITERALS = { "inherit": true };
    
    var firstElement;
    var lastElement;

    var tt;
    
    loop: while(tt = tz.nextToken()) {
      var el = tz.element;
      if( !firstElement ) firstElement = el;
      lastElement = el;
      switch(tt) 
      {
        case "number":      tz.tokenRange.highlight("number"); break; 
        case "number-unit":  tz.tokenRange.highlight("number-unit"); break; 
        case "string":      tz.tokenRange.highlight("string"); break;
        case "name":         
        {
          var val = tz.tokenValue;
          if( val[0] == '#' )
            tz.tokenRange.highlight("literal");
          else if(KEYWORDS[val]) 
            tz.tokenRange.highlight("keyword"); 
          else if(LITERALS[val]) 
            tz.tokenRange.highlight("literal"); 
          break;
        }
        case "comment": tz.tokenRange.highlight("comment"); break;
        case "island-end":  
          // got </style>
          tz.pop(); //pop tokenizer layer
          break loop;
      }
    }
    if(isEditor && embedded) {
      for( var el = firstElement; el; el = el.nextElementSibling ) {
        if( el == lastElement )
          break;
        el.setAttribute("type","style");
      }
    }
  };
  
  var me = this;
  
  function doIt() { 
  
    var syntax = me.getAttribute("type");
     
    var tz = new Tokenizer( me, syntax );
  
    if( syntax.endsWith("/htm") || syntax.endsWith("/html") || syntax.endsWith("/svg") || syntax.endsWith("/xml") )
      doMarkup(tz);
    else if( syntax.endsWith("/css") )
      doStyle(tz);
    else 
      doScript(tz,syntax);
  }
  
  doIt();
  
  // redefine value property

  Object.defineProperty(me, "value", {
    get: function () {
      return me.state.value;
    },
    set: function (value) {
      me.state.value = value.replaceAll("\r\n","\n");
      doIt();
    }
  });
  
  if (isEditor)
    this.on("change", function() { this.timer(40,doIt); });

}