
# behavior: form

This element handles extended functionality of `<form>` elements. The behavior can be applied to any container where "compound value" is needed.

Intended use cases of the behavior:form :

* classic web forms use cases - when attribute *action* is defined the behavior will do HTTP/POST to that URL with the data (a.k.a. value) of the form.
* compound value container use cases - value of the form is a map of name/value pairs of named elements (that have attribute name defined) inside the form.

## Elements

These elements have `behavior:form` applied by default:

* `<form>`

## Model

Any DOM element having *name* attribute defined inside the form is treated as "submitable" and participates in form value formation.

Value of the form is always compound (aggregate, map ) JSON value.

Example, value of the form:

```XML
<form>
   First name: <input|text name="first" value="Foo"> 
   Last name: <input|text name="last" value="Bar">
</form>
```

is

```
{
  first: "Foo",
  last: "Bar" 
}
```

### Radio groups and check boxes

Group of radio elements having the same name is treated as a group. Value of the group is a single value - value attribute of `:checked` radio button.

Value of check box element is a content of its value attribute. If checkbox is not checked then it has undefined value.

Therefore value of the form:

```
<form>
   Name: <input|text name="firstName" value="Peter">
   Male: <input|radio name="sex" value="male" checked>
   Female: <input|radio name="sex" value="female">
   Adult: <input|checkbox name="adult" value="mature" checked>
   Owns Cadillac: <input|checkbox name="ownsCadddilac" value="yes">
</form>

```

is

```
{
  firstName:"Peter",
  sex: "male",
  adult: "mature",
  ownsCadddilac: undefined
}
```

### Field groups

Some fields can be grouped into named containers forming sub-objects in value map:

```XML
<form>
   <div name="credentials">
     User name: <input|text name="un" value="Peter">
     Password: <input|password name="pwd" value="12345">
   </div>
   Save login: <input|checkbox name="persistLogin" value="true" checked>
</form>
```

produces this value:

```
{  
   credentials: { 
     un: "Peter", 
     pwd: "12345" },
   persistLogin: true; 
}
```

## Attributes

These attributes are used in web forms cases:

* `action` \- URL, required for web form submission, receiver of submitted form data;
* `target` \- optional, name or id of target frame that will render response of action URL;
* `method` \- the HTTP method that the browser uses to submit the form. Possible values are: "post" and "get". Default value: "post"
* `enctype` \- for `method="post"` defines MIME format of the submission, can be:

* `"application/x-www-form-urlencoded"` \- default value if the attribute is not specified;
* `"multipart/form-data"` \- is used when the form contains `<input name="..." type="file">`.

## Events

* `"reset"` / FORM\_RESET event - generated in response of `<button|reset>` click event inside the form. If this event is not consumed by script then the form clears values of inputs to their default values;
* `"submit"` / FORM\_SUBMIT event - generated in response of `<button|submit>` click event inside the form. If this event is not consumed by script then the behavior send form values to the *action* URL;
* `"input"` or `"change"` / FORM_VALUE_CHANGED event - generated in response of one of "change" events on inputs inside the form. The event is translated to "change" event on the form element.

## Methods

* `element.form.submit()` - submits content of the form if its *action* attribute is defined on the form.
* `element.form.reset()` - resets input elements to their initial values.

## Value

name/value map - object in script terms with names corresponding to name attributes of DOM elements inside the form.

## Form change handling in script

### `on()` subscription

```JavaScript
var frm = document.$("form#some");
frm.on("change", function() { var formValue = this.value; ... });
document.on("change", "form#some", function(evt, form) { var formValue = form.value; ... });
```

