

export function FormError(props) {
  const name = props.name;
  const error = Form.instance.errors?.[name]; 
  if( error ) 
    return <div.error for={name}>⇐ {error}</div>;
  else 
    return <div/>;
}

export class Form extends Element {

    errors;

    constructor(props, kids) {
        super();
        this.kids = kids;
        this.validate = props.validate || function(){return {}};
        const value = props.value;
        if(value)
          document.post(()=>{this.value = value});
    }
  
    //["on change"](evt) { 
    //  this.componentUpdate({errors:this.validate(this.value)});
    //}

    //["on blur"](evt) {
    //    this.componentUpdate({errors:this.validate(this.value)});
    //}

    render(props) {
        Form.instance = this;
        return <form styleset={__DIR__ + "form.css#form"}>{this.kids}</form>;
    }

    ["on ^submit"](evt) {
      const errors = this.validate(this.value);
      this.componentUpdate({errors});
      if(Object.keys(errors).length)
        evt.stopPropagation(); // consume it
    }

    get value() { return this.state.value; }
    set value(v) { this.state.value = v; this.componentUpdate(); }

}