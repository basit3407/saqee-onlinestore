import { isEmpty } from "./product";

export default function validate(data) {
  const errors = {};

  for (const property in data) {
    // exclude optional properties from validation
    errors[property] =
      !(property === "address2") && !data[property]
        ? `${property} is required` //empty fields validation
        : property === "number" &&
          !/^[0-9-+]{10,15}$/.test(data[property]) && //phone number validation
          "please enter valid phone number";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
}
