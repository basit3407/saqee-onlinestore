export default function validate(data) {
  let errors;
  for (const property in data) {
    //exclude optional properties
    errors =
      !(
        property === "description" ||
        property === "auxillaryImages" ||
        property === "brand" ||
        property === "variations"
      ) && !data[property] //empty fields validation
        ? {
            ...errors,
            [property]: `${property.charAt(0).toUpperCase()}${property.slice(
              1
            )} is required`,
          }
        : {
            ...errors,
            ...((property === "countInStock" || property === "price") && //numbers validation
              !/^d+$/.test(data[property]) && {
                [property]: "Please enter number in numeric format",
              }),
          };
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
