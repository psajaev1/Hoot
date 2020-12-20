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
exports.validateLoginData = (data) => {
  let errors = {};

  if (isEmpty(data.email)) errors.email = "Must not be empty";
  if (isEmpty(data.password)) errors.password = "Must not be empty";

  return { errors, valid: Object.keys(errors).length === 0 ? true : false };
};

// Valid user details
exports.reduceUserDetails = (data) => {
  let userDetails = {};
  if (!isEmpty(data.firstName.trim())) userDetails.firstName = data.firstName;
  if (!isEmpty(data.lastName.trim())) userDetails.lastName = data.lastName;
  if (!isEmpty(data.interest1.trim())) userDetails.interest1 = data.interest1;
  if (!isEmpty(data.interest2.trim())) userDetails.interest2 = data.interest2;
  if (!isEmpty(data.interest3.trim())) userDetails.interest3 = data.interest3;
  if (userDetails.gradYear > 0) userDetails.gradYear = data.gradYear;
  if (!isEmpty(data.occupation.trim()))
    userDetails.occupation = data.occupation;
  if (!isEmpty(data.major.trim())) userDetails.major = data.major;
  if (!isEmpty(data.school.trim())) userDetails.school = data.school;
  return userDetails;
};

exports.reduceMentorDetails = (data) => {
  let mentorDetails = {};
};
