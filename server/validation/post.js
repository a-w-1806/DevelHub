const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validatePostInput(reqBody) {
  let errors = {};

  reqBody.text = !isEmpty(reqBody.text) ? reqBody.text : "";

  if (!Validator.isLength(reqBody.text, { min: 10, max: 300 })) {
    errors.text = "Post must be between 10 and 300 characters";
  }

  if (Validator.isEmpty(reqBody.text)) {
    errors.text = "Text field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
