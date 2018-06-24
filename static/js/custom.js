$(document).ready(function() {

  var normalValidationFormClass = ".normal-validation",
      normalFormSubmitButton = ".normal-form-submit-button",
      normalFormClearButton = ".normal-form-clear-button";

  $(normalFormSubmitButton).click(function(e) {
    e.preventDefault();

    if($(normalValidationFormClass).leanValidator("validate")) {
      alert("Normal Form is good.");
    }

  });

  $(normalFormClearButton).click(function(e) {
    e.preventDefault();

    $(normalValidationFormClass).leanValidator("clear");
  });

  $(normalValidationFormClass).leanValidator();

});