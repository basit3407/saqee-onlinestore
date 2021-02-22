import validator from "validator";
import isEmpty from "is-empty";

export default function validate(data) {
  const errors = {};

  for (const property in data) {
    // exclude optional properties from validation
    if (
      !(
        property === "description" ||
        property === "auxillaryImages" ||
        property === "brand" ||
        property === "variations"
      )
    ) {
      // Convert remaining compulsory empty fields to an empty string to use validator functions
      data[property] = !isEmpty(data[property]) ? data[property] : "";
      //return error if any of the compulsory fields i empty
      if (validator.isEmpty(data[property]))
        errors[property] = `${property} field is required`;
      // if countInStock or price is not a number return error
      if (property === "countInStock" || property === "price")
        errors[property] = `please the the ${property} in numbers`;
    }
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
}
