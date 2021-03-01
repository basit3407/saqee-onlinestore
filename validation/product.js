export default function validate(data) {
  const errors = {};

  for (const property in data) {
    //empty fields validation,exclude optional properties
    if (
      !(
        property === "description" ||
        property === "auxillaryImages" ||
        property === "brand" ||
        property === "variations"
      ) &&
      !data[property]
    )
      errors[property] = `${property} field is required`;
    //Numbers validation
    else if (
      property === "countInStock" ||
      (property === "price" && !/^d+$/.test(data[property]))
    )
      errors[property] = `please type the the ${property} in numbers`;
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
