/* eslint-disable no-prototype-builtins */
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
    )
      if (isEmpty(data[property]))
        //return error if any of the compulsory fields is empty
        errors[property] = `${property} field is required`;
      // if countInStock or price is not a number return error
      else if (property === "countInStock" || property === "price")
        if (!/^d+$/.test(data[property]))
          errors[property] = `please type the the ${property} in numbers`;
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
}

//This function checks for empty objects
export function isEmpty(obj) {
  for (const prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      return false;
    }
  }

  return JSON.stringify(obj) === JSON.stringify({});
}
