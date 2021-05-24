

export class ToolWindow extends Window {

  constructor(content/*vnode*/) {
     
    const width = (content[1]["window-width"] || 200) * devicePixelRatio;
    const height = (content[1]["window-height"] || 200) * devicePixelRatio;

    let params = { 
      url: __DIR__ + "tool-window.htm",
      type: Window.TOOL_WINDOW,
      width : width,
      height : height,
      alignment: 9,
      parameters: content
    };
    super(params);
  }

}