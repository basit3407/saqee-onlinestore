import validator from "validator";
import isEmpty from "is-empty";

export default function validate(data) {
  const errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  for (const property in data) {
    data[property] = !isEmpty(data[property]) ? data[property] : "";
  }

  //return error if any of the fields i empty
  for (const property in data) {
    if (validator.isEmpty(data[property]))
      errors[property] = `${property} field is required`;
  }

  //if count in stock is not a number.return error
  if (!validator.isInt(data.countInStock))
    errors.countInStock = "please enter the number";

  return {
    errors,
    isValid: isEmpty(errors),
  };
}
