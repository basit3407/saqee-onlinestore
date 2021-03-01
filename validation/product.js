export default function validate(data) {
  const errors = {};

  for (const property in data) {
    //exclude optional properties from validation
    errors[property] =
      !(
        property === "description" ||
        property === "auxillaryImages" ||
        property === "brand" ||
        property === "variations"
      ) && isEmpty(data[property])
        ? `${property} field is required` //empty fields validation
        : (property === "countInStock" || property === "price") &&
          !/^d+$/.test(data[property]) &&
          `please type the the ${property} in numbers`; //numbers
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
}

//This function checks for empty objects
export const isEmpty = (obj) => {
  for (const prop in obj) return false;
  return true;
};
