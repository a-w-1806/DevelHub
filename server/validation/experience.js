const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateExperienceInput(reqBody) {
  let errors = {};

  reqBody.title = !isEmpty(reqBody.title) ? reqBody.title : "";
  reqBody.company = !isEmpty(reqBody.company) ? reqBody.company : "";
  reqBody.from = !isEmpty(reqBody.from) ? reqBody.from : "";

  if (Validator.isEmpty(reqBody.title)) {
    errors.title = "Job title field is required";
  }

  if (Validator.isEmpty(reqBody.company)) {
    errors.company = "Company field is required";
  }

  if (Validator.isEmpty(reqBody.from)) {
    errors.from = "From date field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
