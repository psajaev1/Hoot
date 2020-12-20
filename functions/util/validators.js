// Checks if string is empty
const isEmpty = (string) => {
  if (string.trim() === "") return true;
  else return false;
};

// Checks if email is valid
const isEmail = (email) => {
  const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email.match(regEx)) return true;
  else return false;
};

// Valid signup
exports.validateSignupData = (data) => {
  let errors = {};

  if (isEmpty(data.email)) {
    errors.email = "Must not be empty";
  } else if (!isEmail(data.email)) {
    errors.email = "Must be a valid email address";
  }
  if (isEmpty(data.password)) errors.password = "Must not be empty";
  if (data.password !== data.confirmPassword)
    errors.password = "Passwords must match";
  if (isEmpty(data.username)) errors.username = "Must not be empty";

  return { errors, valid: Object.keys(errors).length === 0 ? true : false };
};

// Valid login
exports.validateLogin = (data) => {
  let errors = {};

  if (isEmpty(user.email)) errors.email = "Must not be empty";
  if (isEmpty(user.password)) errors.password = "Must not be empty";

  return { errors, valid: Object.keys(errors).length === 0 ? true : false };
};
