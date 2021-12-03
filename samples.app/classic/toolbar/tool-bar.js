
export class ToolBar extends Element {

    app;

    this(props,kids) {
        this.app = props.app;
    }

    render() {
        return <toolbar styleset={__DIR__ + "tool-bar.css#tool-bar"}>
          <button.cmd.new-file title="New file" />
          <button.cmd.open-file title="Open file" />
          <button.cmd.save-file title="Save file" />
          <button.cmd.save-file-as title="Save file as" />
        </toolbar>;
    }

}