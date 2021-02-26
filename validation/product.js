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
    )
      if (isEmpty(data[property]))
        //return error if any of the compulsory fields is empty
        errors[property] = `${property} field is required`;
      // if countInStock or price is not a number return error
      else if (property === "countInStock" || property === "price")
        if (!data[property].match("/^d+$/"))
          errors[property] = `please type the the ${property} in numbers`;
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
}
