import approve from 'approvejs';

class LeanValidator {

  constructor () {
    //Init an empty global variable object
    this.globalVars = {};

    //Add initial configurations
    this.__initConfigurations();

    //Add custom validations to approve
    this.__initCustomValidations();

    //Add initial rules
    this.__initDefaultRules();
  }

  /**
   * In order for the validator to run following configurations are necessary
   */
  __initConfigurations() {
    this.globalVars = {
      validationSplitKey: "|",
      classes: {
        errorMessage: "lv-validate-error-message",
        getErrorMessageClass: function () {
          return "."+this.errorMessage;
        }
      },
      dataAttributes: {
        errorContainer: "lvErrorContainer",
        approvalKey: {
          raw: "lv-validated",
          processed: "lvValidated"
        },
        validationRules: {
          raw: "lv-validate",
          processed: "lvValidate"
        },
        validationTitle: {
          raw: "lv-validate-title",
          processed: "lvValidateTitle"
        },
        noValidateDisabled: {
          raw: "lv-no-validate-disabled",
          processed: "lvNoValidateDisabled"
        }
      },
    };
  }

  /**
   * Default rules available for use by lean validator
   */
  __initDefaultRules() {
    let rulesObject = {};

    //Required rule
    rulesObject.required = {
      required: true,
        title: ''
    };

    //Email rule
    rulesObject.email = {
      email: {
        message: '{title} must be a valid email'
      },
      title: ''
    };

    //Validation for array not empty
    rulesObject.valid_no_empty_array = {
      validNonEmptyArray: {
        message: '{title} cannot be empty'
      },
      title: ''
    };

    //Validation for if number is greater than 0
    rulesObject.number_greater_than_zero = {
      numberGreaterThanZero: {
        message: '{title} must be greater than 0'
      },
      title: ''
    };

    this.globalVars.rules = rulesObject;
  }

  /**
   * Add custom validation to approve
   */
  __initCustomValidations() {
    //Test to check if a valid array and non empty
    let validNonEmptyArray = {};
    validNonEmptyArray.expects = 'array';
    validNonEmptyArray.message = '{title} cannot be empty.';
    validNonEmptyArray.validate = function(value, pars) {
      return Array === value.constructor && 0 < value.length;
    };

    //Test to check if a number is greater than zero
    let numberGreaterThanZero = {};
    numberGreaterThanZero.expects = 'number';
    numberGreaterThanZero.message = '{title} cannot be lower than 1.';
    numberGreaterThanZero.validate = function(value, pars) {
      return 0 < value;
    };

    approve.addTest(validNonEmptyArray, 'validNonEmptyArray');
    approve.addTest(numberGreaterThanZero, 'numberGreaterThanZero');
  }

  validate(formClassName) {
    let formElement = document.getElementsByClassName(formClassName);

    console.log(formElement);
  }

}

export default LeanValidator;