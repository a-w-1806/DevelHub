const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateLoginInput(reqBody) {
  let errors = {};

  // Methods of Validator can only take string as input.
  // So we should convert undefined to "" first.
  reqBody.email = !isEmpty(reqBody.email) ? reqBody.email : "";
  reqBody.password = !isEmpty(reqBody.password) ? reqBody.password : "";

  if (!Validator.isEmail(reqBody.email)) {
    errors.email = "Email is invalid";
  }

  if (Validator.isEmpty(reqBody.email)) {
    errors.email = "Email field is required";
  }

  if (Validator.isEmpty(reqBody.password)) {
    errors.password = "Password field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
