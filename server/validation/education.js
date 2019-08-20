const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateEducationInput(reqBody) {
  let errors = {};

  reqBody.school = !isEmpty(reqBody.school) ? reqBody.school : "";
  reqBody.degree = !isEmpty(reqBody.degree) ? reqBody.degree : "";
  reqBody.fieldofstudy = !isEmpty(reqBody.fieldofstudy)
    ? reqBody.fieldofstudy
    : "";
  reqBody.from = !isEmpty(reqBody.from) ? reqBody.from : "";

  if (Validator.isEmpty(reqBody.school)) {
    errors.school = "School field is required";
  }

  if (Validator.isEmpty(reqBody.degree)) {
    errors.degree = "Degree field is required";
  }

  if (Validator.isEmpty(reqBody.fieldofstudy)) {
    errors.fieldofstudy = "Field of study field is required";
  }

  if (Validator.isEmpty(reqBody.from)) {
    errors.from = "From date field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
