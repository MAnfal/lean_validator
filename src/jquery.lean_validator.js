import approve from 'approvejs';

(function ($, approve) {
  if($ && approve) {
    let globalVars = {
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
      rules: {
        required: {
          required: true,
          title: ''
        },
        email: {
          email: {
            message: '{title} must be a valid email'
          },
          title: ''
        },
        valid_no_empty_array: {
          validNonEmptyArray: {
            message: '{title} cannot be empty'
          },
          title: ''
        },
        number_greater_than_zero: {
          numberGreaterThanZero: {
            message: '{title} must be greater than 0'
          },
          title: ''
        }
      }
    };

    let methods = {
      validate: function($form) {
        let $elements = $form.find("[data-"+globalVars.dataAttributes.validationRules.raw+"]"),
          totalElementsValidated = 0;

        $elements.map(function(index, element) {
          let $element = $(element),
            validationRulesArray = methods._parseValidationRules($element),
            valueToBeValidated = $element.val(),
            rulesObject = {},
            isElementDisabled = $element.is(":disabled"),
            shouldNotValidateDisabled = $element.data(globalVars.dataAttributes.noValidateDisabled.processed);

          if(!isElementDisabled || undefined === shouldNotValidateDisabled) {
            for (let index = 0; index < validationRulesArray.length; index++) {
              let rule = validationRulesArray[index];
              if(globalVars.rules.hasOwnProperty(rule)) {
                let ruleObject = globalVars.rules[rule];

                ruleObject.title = (
                  undefined !== $element.data(globalVars.dataAttributes.validationTitle.processed) ?
                    $element.data(globalVars.dataAttributes.validationTitle.processed) :
                    "Input"
                );

                $.extend(rulesObject, globalVars.rules[rule]);
              }
            }

            let result = approve.value(valueToBeValidated, rulesObject);

            if(result.approved) {
              methods._clearErrorMessage($element);
              totalElementsValidated++;
            } else {
              methods._displayErrorMessage($element, result.errors);
            }
          } else {
            methods._clearErrorMessage($element);

            //Since the element is not getting checked but it was passed for checking.
            totalElementsValidated++;
          }
        });

        return totalElementsValidated === $elements.length;
      },

      clear: function($form) {
        let $elements = $form.find("[data-"+globalVars.dataAttributes.validationRules.raw+"]");

        $elements.map(function(index, element) {
          let $element = $(element);
          methods._clearErrorMessage($element);
        });
      },

      _parseValidationRules: function($element) {
        let $rules = $element.data(globalVars.dataAttributes.validationRules.processed);
        return $rules.split(globalVars.validationSplitKey);
      },

      generateCustomValidationRules: function() {
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
      },

      _displayErrorMessage: function($element, errorsArray) {
        let errorContainer = methods._getErrorContainer($element),
          errors = "";

        for(let index = 0; index < errorsArray.length; index++) {
          errors += "<p style='text-align: right; color: red; font-weight: bold; font-size: 13px;'>"+errorsArray[index]+"</p>";
        }

        let html = methods._getMessageHtml(errors);

        if(undefined === errorContainer) {
          methods._clearErrorMessage($element);
          $element.parent().append(html);
        } else {
          $(errorContainer).empty().append(html);
        }
      },

      _clearErrorMessage: function($element) {
        let errorContainer = methods._getErrorContainer($element);
        if(undefined === errorContainer) {
          $element.parent().find(globalVars.classes.getErrorMessageClass()).remove();
        } else {
          $(errorContainer).empty();
        }
      },

      _getMessageHtml: function ($errorsString) {
        return "<span class='"+globalVars.classes.errorMessage+"'>" +
          $errorsString +
          "</span>";
      },

      _getErrorContainer: function ($element) {
        let errorContainerSelector = $element.data(globalVars.dataAttributes.errorContainer),
          $errorContainer = undefined;

        if(undefined !== errorContainerSelector) {
          $errorContainer = $(errorContainerSelector);
        }

        return $errorContainer;
      }
    };

    $.fn.leanValidator = function initiate(method) {
      let $form = $(this),
        isFormOk = false;

      if($form.is("form")) {
        //Generate the custom rules used by approve
        methods.generateCustomValidationRules();

        //Method is provided so use that
        if(undefined !== method) {
          if(methods.hasOwnProperty(method)) {
            isFormOk = methods[method]($form);
          } else {
            console.log("Method: "+method+" not found on lean validator.");
          }
        } else {
          $form.on("submit", function() {
            return methods.validate($form);
          });
        }
      } else {
        console.log("Please apply lean validator to a form only.");
      }

      return isFormOk;
    };
  } else {
    console.log("Please install https://jquery.com/ and https://charlgottschalk.github.io/approvejs/")
  }
})(window.$, approve);