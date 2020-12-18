import { View } from "view.js";

export class MemoryView extends View 
{
  constructor(props) { super(props,"MemoryView"); }

  render() {
    return <div>memory</div>;
  }

  static header(channel) {
  }
}