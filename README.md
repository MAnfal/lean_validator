# A JQuery based customizable validation plugin

Lean validator is a JQuery wrapper over [Approve.js](https://github.com/CharlGottschalk/approvejs)

The intentions of writing lean validator are straight forward. It is going to solve following potential problems.

- Validate disabled inputs
- Validate inputs that gets hidden by 3rd party plugins
- Have a small footprint
- Ease of adding custom rules


## API Documentation

In order to use the plugin please download and save [plugin](https://raw.githubusercontent.com/MAnfal/lean_validator/develop/dist/jquery.lean_validator.js) and include it in your HTML file.

**Please note that you will need JQuery v1.7+ to run this plugin**

### Attach to form
In order to attach the plugin to a form please use following method 

    $(FORM_SELECTOR).leanValidator()

### Validation
Right now manual validation is supported so please use following method to validate the form.

```
$(normalFormSubmitButton).click(function(e) {  
  e.preventDefault();  
  
  if($(normalValidationFormClass).leanValidator("validate")) {  
    alert("Normal Form is good.");  
  }  
});
```

Currently following attributes are supported  for validation

- `data-lv-validate="required"` if an input field is required
- `data-lv-validate="email"` if an input should be a valid email
- `data-lv-validate="number_greater_than_zero"`if an input must have a number greater than zero
- `data-lv-validate-title="Password"` if custom title must be used for input instead default one
- `data-lv-validate-no-disabled="true"` by default lean validator will validate disabled inputs as well but passing the attribute will stop that behavior

### Clearing validations
Please use following method to clear the validation errors added to the form.

## Roadmap
Since this is a new plugin, it will have constant developments in it. You can still open an issue and request a feature or contribute to it.