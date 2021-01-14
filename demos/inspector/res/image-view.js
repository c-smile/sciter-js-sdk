
export class ImageView extends Element 
{
  constructor(props) {
    super(props);
    this.channel = props.channel;
    this.imageBytes = props.data;
  }


  render(props) {

    if( this.filename != props.filename ) {
      post(() => {
        var img = Graphics.Image.fromBytes(this.imageBytes);
        if(!img) return;
        this.$("picture").value = img;
        this.$("form").value = { width: img.width, height: img.height, type: img.packaging, size: this.imageBytes.byteLength };
      });
    }

    return <figure type={this.mimeType} id="picture-view">
      <picture/>
      <form>
        <label>width (ppx)</label><output|integer(width)/>
        <label>height (ppx)</label><output|integer(height)/>
        <label>file type</label><output(type)/>
        <label>file size (bytes)</label><output|integer(size)/>
      </form>
    </figure>; 

  }

}