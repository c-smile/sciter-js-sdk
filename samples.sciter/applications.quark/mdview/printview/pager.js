
export class Pager extends Element 
{
  static instance;  

  componentDidMount()
  {
    Pager.instance = this;
    var printers = document.$("div#printers");
    for(var printer of this.pager.printers()) 
      printers.append(<button|radio(printer) value={printer.id} state-checked={printer.isDefault}>{printer.name}</button>);
  }

  // template is loaded, page size is known - pager is ready to accept document:
  ["on paginationready"](evt) {
    let event = new Event("provide-current-document", {bubbles:true});
    this.dispatchEvent(event);
    const { html, href} = event.data; 
    this.pager.loadHtml(html,href);
  }

  ["on paginationend"](evt) {
    document.$("#numpages").value = evt.reason;
    document.$("#current-page").attributes["max"] = evt.reason;
  }
}

document.on("change", "div#printers", function(evt,form) { 
  Pager.instance.pager.selectPrinter( form.value.printer ); 
});
  
document.on("click", "button#print", function() { 
  Pager.instance.pager.print(); 
});

document.on("change", "#current-page", function(evt,pageNo) { 
  Pager.instance.pager.page = pageNo.value; 
});
