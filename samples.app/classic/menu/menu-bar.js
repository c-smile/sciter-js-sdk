

export class MenuBar extends Element {

    app;

    this(props,kids) {
        this.app = props.app;
    }

    render() {
        return <ul styleset={__DIR__ + "menu-bar.css#menu-bar"}>
            <li>File
                <menu>
                  <li.command name="new-file" accesskey="^N">New file <span class="accesskey">Ctrl+N</span></li>
                  <li.command name="open-file">Open file …</li>
                  <li.command name="save-file">Save file</li>
                  <li.command name="save-file-as">Save file as …</li>
                </menu>
            </li>
            <li>Edit
                <menu>
                  <li.command name="edit-copy">Copy</li>
                  <li.command name="edit-paste">Cut</li>
                  <li.command name="edit-paste">Paste</li>
                </menu>
            </li>
            <li>View
                <menu>
                  <li|check.view-toggle name="navigation" checked={this.app.navigationViewShown}>Navigation View</li>
                  <li|check.view-toggle name="properties" checked={this.app.propertiesViewShown}>Properties View</li>
                </menu>
            </li>
        </ul>;
    }

}