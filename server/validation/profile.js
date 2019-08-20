const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateProfileInput(reqBody) {
  let errors = {};

  reqBody.handle = !isEmpty(reqBody.handle) ? reqBody.handle : "";
  reqBody.status = !isEmpty(reqBody.status) ? reqBody.status : "";
  reqBody.skills = !isEmpty(reqBody.skills) ? reqBody.skills : "";

  if (!Validator.isLength(reqBody.handle, { min: 2, max: 40 })) {
    errors.handle = "Handle needs to between 2 and 40 characters";
  }

  if (Validator.isEmpty(reqBody.handle)) {
    errors.handle = "Profile handle is required";
  }

  if (Validator.isEmpty(reqBody.status)) {
    errors.status = "Status field is required";
  }

  if (Validator.isEmpty(reqBody.skills)) {
    errors.skills = "Skills field is required";
  }

  if (!isEmpty(reqBody.website)) {
    if (!Validator.isURL(reqBody.website)) {
      errors.website = "Not a valid URL";
    }
  }

  if (!isEmpty(reqBody.youtube)) {
    if (!Validator.isURL(reqBody.youtube)) {
      errors.youtube = "Not a valid URL";
    }
  }

  if (!isEmpty(reqBody.twitter)) {
    if (!Validator.isURL(reqBody.twitter)) {
      errors.twitter = "Not a valid URL";
    }
  }

  if (!isEmpty(reqBody.facebook)) {
    if (!Validator.isURL(reqBody.facebook)) {
      errors.facebook = "Not a valid URL";
    }
  }

  if (!isEmpty(reqBody.linkedin)) {
    if (!Validator.isURL(reqBody.linkedin)) {
      errors.linkedin = "Not a valid URL";
    }
  }

  if (!isEmpty(reqBody.instagram)) {
    if (!Validator.isURL(reqBody.instagram)) {
      errors.instagram = "Not a valid URL";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
