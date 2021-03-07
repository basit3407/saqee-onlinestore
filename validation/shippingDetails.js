import { isEmpty } from "./product";
export default function validate(data) {
  let errors;
  for (const property in data) {
    errors =
      property !== "address2" && !data[property] //empty fileds validation,excluding optional property
        ? {
            ...errors,
            [property]: `${property.charAt(0).toUpperCase()}${
              property.slice(1).replace(/([A-Z])/g, " $1") //Add spaces between capital letters
            } is required`,
          }
        : {
            ...errors,
            ...(property === "number" && //phone number validation
              !/^[0-9-+]{10,15}$/.test(data[property]) && {
                [property]: "Please enter valid phone number",
              }),
          };
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
}
