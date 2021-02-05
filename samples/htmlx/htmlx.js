

export class HTMLElement extends Element {
  get hidden() { return this.state.hidden; }
  get isContentEditable() { return this.state.contenteditable; }
  // and so on
}


// TODO: add specific properties and methods
export class HTMLDocument extends Document {}
export class HTMLAnchorElement extends HTMLElement {}
export class HTMLAreaElement extends HTMLElement {}
export class HTMLAudioElement extends HTMLElement {}
export class HTMLBaseElement extends HTMLElement {}
export class HTMLBodyElement extends HTMLElement {}
export class HTMLBRElement extends HTMLElement {}
export class HTMLButtonElement extends HTMLElement {}
export class HTMLCanvasElement extends HTMLElement {}
export class HTMLContentElement extends HTMLElement {}
export class HTMLDataElement extends HTMLElement {}
export class HTMLDataListElement extends HTMLElement {}
export class HTMLDetailsElement extends HTMLElement {}
export class HTMLDialogElement extends HTMLElement {}
export class HTMLDivElement extends HTMLElement {}
export class HTMLDListElement extends HTMLElement {}
export class HTMLEmbedElement extends HTMLElement {}
export class HTMLFieldSetElement extends HTMLElement {}
export class HTMLFontElement extends HTMLElement {}
export class HTMLFormElement extends HTMLElement {}
export class HTMLFrameSetElement extends HTMLElement {}
export class HTMLHeadElement extends HTMLElement {}
export class HTMLHeadingElement extends HTMLElement {}
export class HTMLHRElement extends HTMLElement {}
export class HTMLHtmlElement extends HTMLDocument {}
export class HTMLIFrameElement extends HTMLElement {}
export class HTMLImageElement extends HTMLElement {}
export class HTMLInputElement extends HTMLElement {}
export class HTMLKeygenElement extends HTMLElement {}
export class HTMLLabelElement extends HTMLElement {}
export class HTMLLegendElement extends HTMLElement {}
export class HTMLLIElement extends HTMLElement {}
export class HTMLLinkElement extends HTMLElement {}
export class HTMLMapElement extends HTMLElement {}
export class HTMLMarqueeElement extends HTMLElement {}
export class HTMLMediaElement extends HTMLElement {}
export class HTMLMenuElement extends HTMLElement {}
export class HTMLMenuItemElement extends HTMLElement {}
export class HTMLMetaElement extends HTMLElement {}
export class HTMLMeterElement extends HTMLElement {}
export class HTMLModElement extends HTMLElement {}
export class HTMLObjectElement extends HTMLElement {}
export class HTMLOListElement extends HTMLElement {}
export class HTMLOptGroupElement extends HTMLElement {}
export class HTMLOptionElement extends HTMLElement {}
export class HTMLOutputElement extends HTMLElement {}
export class HTMLParagraphElement extends HTMLElement {}
export class HTMLParamElement extends HTMLElement {}
export class HTMLPictureElement extends HTMLElement {}
export class HTMLPreElement extends HTMLElement {}
export class HTMLProgressElement extends HTMLElement {}
export class HTMLQuoteElement extends HTMLElement {}
export class HTMLScriptElement extends HTMLElement {}
export class HTMLSelectElement extends HTMLElement {}
export class HTMLShadowElement extends HTMLElement {}
export class HTMLSlotElement extends HTMLElement {}
export class HTMLSourceElement extends HTMLElement {}
export class HTMLSpanElement extends HTMLElement {}
export class HTMLStyleElement extends HTMLElement {}
export class HTMLTableCaptionElement extends HTMLElement {}
export class HTMLTableCellElement extends HTMLElement {}
export class HTMLTableColElement extends HTMLElement {}
export class HTMLTableElement extends HTMLElement {}
export class HTMLTableRowElement extends HTMLElement {}
export class HTMLTableSectionElement extends HTMLElement {}
export class HTMLTemplateElement extends HTMLElement {}
export class HTMLTextAreaElement extends HTMLElement {}
export class HTMLTimeElement extends HTMLElement {}
export class HTMLTitleElement extends HTMLElement {}
export class HTMLTrackElement extends HTMLElement {}
export class HTMLUListElement extends HTMLElement {}
export class HTMLUnknownElement extends HTMLElement {}
export class HTMLVideoElement extends HTMLElement {}

// add them to global namespace 
Object.assign(globalThis, {
  HTMLElement,
  HTMLDocument,
  HTMLAnchorElement,
  HTMLAreaElement,
  HTMLAudioElement,
  HTMLBaseElement,
  HTMLBodyElement,
  HTMLBRElement,
  HTMLButtonElement,
  HTMLCanvasElement,
  HTMLContentElement,
  HTMLDataElement,
  HTMLDataListElement,
  HTMLDetailsElement,
  HTMLDialogElement,
  HTMLDivElement,
  HTMLDListElement,
  HTMLEmbedElement,
  HTMLFieldSetElement,
  HTMLFontElement,
  HTMLFormElement,
  HTMLFrameSetElement,
  HTMLHeadElement,
  HTMLHeadingElement,
  HTMLHRElement,
  HTMLHtmlElement,
  HTMLIFrameElement,
  HTMLImageElement,
  HTMLInputElement,
  HTMLKeygenElement,
  HTMLLabelElement,
  HTMLLegendElement,
  HTMLLIElement,
  HTMLLinkElement,
  HTMLMapElement,
  HTMLMarqueeElement,
  HTMLMediaElement,
  HTMLMenuElement,
  HTMLMenuItemElement,
  HTMLMetaElement,
  HTMLMeterElement,
  HTMLModElement,
  HTMLObjectElement,
  HTMLOListElement,
  HTMLOptGroupElement,
  HTMLOptionElement,
  HTMLOutputElement,
  HTMLParagraphElement,
  HTMLParamElement,
  HTMLPictureElement,
  HTMLPreElement,
  HTMLProgressElement,
  HTMLQuoteElement,
  HTMLScriptElement,
  HTMLSelectElement,
  HTMLShadowElement,
  HTMLSlotElement,
  HTMLSourceElement,
  HTMLSpanElement,
  HTMLStyleElement,
  HTMLTableCaptionElement,
  HTMLTableCellElement,
  HTMLTableColElement,
  HTMLTableElement,
  HTMLTableRowElement,
  HTMLTableSectionElement,
  HTMLTemplateElement,
  HTMLTextAreaElement,
  HTMLTimeElement,
  HTMLTitleElement,
  HTMLTrackElement,
  HTMLUListElement,
  HTMLUnknownElement,
  HTMLVideoElement,
});



