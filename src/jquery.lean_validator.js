import LeanValidator from './lean_validator';

(function ($, LeanValidator) {
  if($) {
    let leanValidator = new LeanValidator();

    leanValidator.validate("normal-validation");
  } else {
    console.log("Please install https://jquery.com/")
  }
})(window.$, LeanValidator);