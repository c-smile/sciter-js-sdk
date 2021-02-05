

export class WebFrameNavigationToolbar extends Element {

  frame = null;
  btnBack;
  btnFore;
  inpUrl;

  componentDidMount() {
    this.frame = this.nextElementSibling;
    this.btnBack = this.$("button#back");
    this.btnFore = this.$("button#fore");
    this.inpUrl = this.$("input#url");
    this.timer(1,this.updateButtonStates);

    this.frame.on("historychange", evt => this.updateButtonStates());

  }

  updateButtonStates() {
    this.btnBack.state.disabled = this.frame.history.length <= 0;
    this.btnFore.state.disabled = this.frame.history.forwardLength <= 0;
  }

}