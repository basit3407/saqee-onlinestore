export default function validate(data) {
  let errors;
  //empty fields validation for compulsory fields
  for (const property in data) {
    errors =
      property === "title" ||
      property === "category" ||
      property === "price" ||
      property === "countInStock" ||
      property === "image"
        ? {
            ...errors,
            ...(!data[property] && {
              [property]: `${property.charAt(0).toUpperCase()}${property
                .slice(1)
                .replace(/([A-Z])/g, " $1")} is required`,
            }),
          }
        : { ...errors };

    // errors = {
    //   ...errors,
    //   //exclude optional properties
    //   ...(!(
    //     property === "description" ||
    //     property === "auxImagesQty" ||
    //     property === "brand" ||
    //     property === "variationsQty" ||
    //     property === "variations" ||
    //     property === "auxImages"
    //   ) &&
    //     !data[property] && {
    //       //empty fields validation for compulsory fields
    //       ...errors,
    //       [property]: `${property.charAt(0).toUpperCase()}${property
    //         .slice(1)
    //         .replace(/([A-Z])/g, " $1")} is required`,
    //     }),
    // };
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
