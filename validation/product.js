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
            [property]: data[property].map((item, index) => {
              if (item) {
                let obj = {};
                if (!item.title)
                  obj.title = `variation ${index + 1} title is required`;
                if (!item.values)
                  obj.values = `variation ${
                    index + 1
                  } number of values is required`;
                else
                  obj.values = item.values.map(
                    (value, valueIndex) =>
                      !value &&
                      `Value ${valueIndex + 1} of variation ${
                        index + 1
                      } is required`
                  );
                return obj;
              } else return `variation ${index + 1} entries are required`;
            }),
          }
        : { ...errors };
  }
  console.log(errors.variations);

  errors.auxImages && isFalsy(errors.auxImages) && delete errors.auxImages; //delete array of errors for auxImages if no errors
  // isFalsy(errors.variations) && delete errors.variations; //delete array pf errors for variations if no errors

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
