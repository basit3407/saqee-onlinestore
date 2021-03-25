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
        : property === "auxImages"
        ? {
            ...errors,
            [property]: data[property].map(
              (item, index) =>
                !item && `Auxillary image ${index + 1} is required`
            ),
          }
        : property === "variations"
        ? {
            ...errors,
            [property]: data[property].map((item, variationIndex) =>
              item
                ? {
                    ...(!item.title && {
                      title: `variation ${
                        variationIndex + 1
                      } title is required`,
                    }),
                    values: item.values
                      ? item.values.map(
                          (value, valueIndex) =>
                            !value &&
                            `Value ${valueIndex + 1} of variation ${
                              variationIndex + 1
                            } is required`
                        )
                      : `variation ${
                          variationIndex + 1
                        } number of values is required`,
                  }
                : `variation ${variationIndex + 1} entries are required`
            ),
          }
        : { ...errors };
  }

  errors.auxImages && isFalsy(errors.auxImages) && delete errors.auxImages; //delete array of errors for auxImages once errors are removed

  // delete array of errors of variations once errors are removed
  if (errors.variations) {
    errors.variations.forEach((variation, index, variations) => {
      !variation.title &&
        Array.isArray(variation.values) &&
        isFalsy(variation.values) &&
        delete variation.values; // remove falsy values

      isEmpty(variation) && variations.splice(index, 1); //remove empty objects
    });
    !errors.variations.length && delete errors.variations; //remove empty array
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

//This function checks if all the values in array are false or not
const isFalsy = (array) => {
  for (let i = 0; i < array.length; i++) if (array[i]) return false;
  return true;
};
