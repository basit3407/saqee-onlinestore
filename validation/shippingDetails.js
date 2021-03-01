import { isEmpty } from "./product";

export default function validate(data) {
  const errors = {};

  for (const property in data) {
    //empty fields validation,exclude optional property
    if (property !== "address2" && !data[property])
      errors[property] = `${property} is required`;
    //phone number validation
    else if (property === "number" && !/^[0-9-+]{10,15}$/.test(data[property]))
      errors[property] = "please enter valid phone number";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
}
