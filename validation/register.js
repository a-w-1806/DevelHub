const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateRegisterInput(reqBody) {
  let errors = {};

  // Methods of Validator can only take string as input.
  // So we should convert undefined to "" first.
  reqBody.name = !isEmpty(reqBody.name) ? reqBody.name : "";
  reqBody.email = !isEmpty(reqBody.email) ? reqBody.email : "";
  reqBody.password = !isEmpty(reqBody.password) ? reqBody.password : "";
  reqBody.password2 = !isEmpty(reqBody.password2) ? reqBody.password2 : "";

  if (!Validator.isLength(reqBody.name, { min: 2, max: 30 })) {
    errors.name = "Name must be between 2 and 30 characters";
  }

  if (Validator.isEmpty(reqBody.name)) {
    errors.name = "Name field is required";
  }

  if (Validator.isEmpty(reqBody.email)) {
    errors.email = "Email field is required";
  }

  if (!Validator.isEmail(reqBody.email)) {
    errors.email = "Email is invalid";
  }

  if (Validator.isEmpty(reqBody.password)) {
    errors.password = "Password field is required";
  }

  if (!Validator.isLength(reqBody.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }

  if (Validator.isEmpty(reqBody.password2)) {
    errors.password2 = "Confirm Password field is required";
  } else {
    if (!Validator.equals(reqBody.password, reqBody.password2)) {
      errors.password2 = "Passwords must match";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
