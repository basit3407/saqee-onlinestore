export default function validate(data) {
  let errors;
  for (const property in data) {
    errors = {
      ...errors,
      //exclude optional properties
      ...(!(
        property === "description" ||
        property === "auxImagesQty" ||
        property === "brand" ||
        property === "variationsQty"
      ) &&
        !data[property] && {
          //empty fields validatio n for compulsory fields
          ...errors,
          [property]: `${property.charAt(0).toUpperCase()}${property
            .slice(1)
            .replace(/([A-Z])/g, " $1")} is required`,
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
