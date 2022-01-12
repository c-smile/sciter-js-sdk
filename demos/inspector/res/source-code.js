function colorize(plaintext) {
  // forward declarations:
  let doStyle;
  let doScript;

  // markup colorizer
  function doMarkup(tz) {
    let tagStart = null; // [node,offset]
    let tagScript = false;
    let tagScriptType = false;
    let tagStyle = false;
    let textElement;

    let tt;

    while (tt = tz.nextToken()) {
      if (tz.element != textElement) {
        textElement = tz.element;
        textElement.setAttribute("type", "markup");
      }
      // stdout.println(tt,tz.attr,tz.value);
      switch (tt) {
        case "tag-start": {
          tagStart = tz.tokenRange.start;
          const tag = tz.markupTag;
          tagScript = tag == "script";
          tagStyle = tag == "style";
        } break;
        case "tag-head-end": {
          (new Range(tagStart, tz.tokenRange.end)).highlight("tag");
          if (tagScript) {
            tz.push(tagScriptType, "</script>");
            doScript(tz, tagScriptType, true);
          }
          else if (tagStyle) {
            tz.push("text/css", "</style>");
            doStyle(tz, true);
          }
        } break;
        case "tag-end": tz.tokenRange.highlight("tag"); break;
        case "tag-attr": if (tagScript && tz.markupAttributeName == "type") tagScriptType = tz.markupAttributeValue;
          if (tz.markupAttributeName == "id") tz.tokenRange.highlight("tag-id");
          break;
      }
    }
  }

  // script colorizer
  doScript = function(tz, typ, embedded = false) {
    const KEYWORDS =
    {
      "function": true, "var": true, "if": true,
      "else": true, "while": true, "return": true, "for": true,
      "break": true, "continue": true, "do": true, "switch": true,
      "case": true, "default": true, "null": true, "super": true,
      "new": true, "try": true, "catch": true, "finally": true,
      "throw": true, "typeof": true, "instanceof": true, "in": true,
      "let": true, "const": true, "get": true, "set": true,
      "include": true, "like": true, "class": true, "of": true,
      "this": true, "delete": true, "with": true, "extends": true,
      "await": true, "async": true, "yield": true, "import": true,
      "export": true,
    };

    const LITERALS = {"true": true, "false": true, "null": true, "undefined": true};

    let firstElement = null;
    let lastElement = null;
    let tt;

    loop: while (tt = tz.nextToken()) {
      var el = tz.element;
      firstElement = firstElement || el;
      lastElement = el;

      switch (tt) {
        case "number": tz.tokenRange.highlight("number"); break;
        case "number-unit": tz.tokenRange.highlight("number-unit"); break;
        case "string": tz.tokenRange.highlight("string"); break;
        case "name": // name token
        {
          const val = tz.tokenValue;
          if (KEYWORDS[val])
            tz.tokenRange.highlight("keyword");
          else if (LITERALS[val])
            tz.tokenRange.highlight("literal");
          break;
        }

        case "comment": tz.tokenRange.highlight("comment"); break;
        case "island-end":
          // got </script>
          tz.pop(); // pop tokenizer layer
          break loop;
      }
    }

    if (embedded) {
      for (var el = firstElement; el; el = el.nextElementSibling) {
        if (el == lastElement)
          break;
        el.setAttribute("syntax", "script");
      }
    }
  };

  doStyle = function(tz, embedded = false) {
    const KEYWORDS = {
      "rgb": true, "rgba": true, "url": true, "var": true,
      "@import": true, "@media": true, "@set": true, "@const": true,
      "@mixin": true, "@supports": true,
    };

    const LITERALS = {"inherit": true};

    let firstElement;
    let lastElement;
    let tt;

    loop: while (tt = tz.nextToken()) {
      var el = tz.element;
      if (!firstElement) firstElement = el;

      lastElement = el;

      switch (tt) {
        case "number": tz.tokenRange.highlight("number"); break;
        case "number-unit": tz.tokenRange.highlight("number-unit"); break;
        case "string": tz.tokenRange.highlight("string"); break;
        case "name":
        {
          const val = tz.tokenValue;
          if (val[0] == "#")
            tz.tokenRange.highlight("literal");
          else if (KEYWORDS[val])
            tz.tokenRange.highlight("keyword");
          else if (LITERALS[val])
            tz.tokenRange.highlight("literal");
          break;
        }

        case "comment": tz.tokenRange.highlight("comment"); break;
        case "island-end":
          // got </style>
          tz.pop(); // pop tokenizer layer
          break loop;
      }
    }

    if (embedded) {
      for (var el = firstElement; el; el = el.nextElementSibling) {
        if (el == lastElement)
          break;

        el.setAttribute("syntax", "style");
      }
    }
  };

  function doIt() {
    const type = plaintext.getAttribute("mimetype");

    const tz = new Tokenizer(plaintext, type);
    let syntax;

    if (type.endsWith("/htm") || type.endsWith("/html") || type.endsWith("/svg") || type.endsWith("/xml")) {
      syntax = "markup";
      doMarkup(tz);
    }
    else if (type.endsWith("/css")) {
      syntax = "style";
      doStyle(tz);
    }
    else {
      syntax = "script";
      doScript(tz, syntax);
    }

    plaintext.setAttribute("syntax", syntax);
  }

  doIt();

  return doIt;
}

export class SourceCode extends Element {
  constructor(props) {
    super(props);
    this.channel = props.channel;
  }

  componentDidMount() {
    this.colorizeIt = colorize(this);
  }

  // redefine value property

  get value() {
    return this.state.value;
  }

  set value(v) {
    this.state.value = v.replaceAll("\r\n", "\n");
    this.colorizeIt();
  }

  // on change request re-colorization
  ["on input"](evt) {
    this.timer(40, this.colorizeIt);
  }

  ["on click at text::marker"](evt) {
    const elText = evt.target.parentElement;

    if (elText.classList.contains("breakpoint"))
      this.channel.removeBreakpoint(this.filename, elText.elementIndex + 1);
    else
      this.channel.addBreakpoint(this.filename, elText.elementIndex + 1);
  }

  updateBreakpoints() {
    const filename = this.filename;
    const breakpoints = this.channel.breakpoints.filter((bp) => bp.filename == filename);
    const map = {};

    for (const bp of breakpoints) {
      if (bp.filename == filename)
        map[bp.lineno] = bp;
    }

    let n = 0;
    for (const line of this.children) {
      const bp = map[++n];
      if (bp) {
        line.classList.toggle("breakpoint", true);
        line.classList.toggle("enabled", bp.enabled);
      }
      else
        line.classList.remove("breakpoint", "enabled");
    }
  }

  render(props) {
    this.type = props.type; // mime type string

    const atbreakpoint = this.channel.atBreakpoint;

    const gotoline = (lineno) => {
      this.lineno = lineno;
      if (!this.lineno)
        return;

      const currentLine = this.$("text:current");
      if (currentLine) currentLine.state.current = false;

      const visitedLine = this.$("text:visited");
      if (visitedLine) visitedLine.state.visited = false;

      const child = this.childElement(lineno - 1);
      if (child) {
        child.scrollIntoView(/* {block:"start"}*/);
        child.state.current = true;
        child.state.visited = true;
        child.timer(2000, () => child.state.visited = false);
      }
    };

    if (this.filename != props.filename) {
      this.filename = props.filename;
      const text = props.text;
      this.post(() => {
        this.value = text;
        gotoline(props.lineno);
      });
    }
    else
      gotoline(props.lineno);

    this.post(() => this.updateBreakpoints());
    const atts = atbreakpoint ? {atbreakpoint: true} : {};

    return <plaintext.source-code id="text-view" {atts} mimetype={this.type} readonly="on" linenumbers="on" />;
  }
}
