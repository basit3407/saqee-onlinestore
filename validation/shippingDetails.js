import { isEmpty } from "./product";

export default function validate(data) {
  const errors = {};

  for (const property in data) {
    //exclude optional properties from validation
    if (property !== "address2")
      if (data[property])
        //return error if any of the compulsory fields is empty
        errors[property] = `${property} is required`;
      //phone number validation
      else if (property === "number")
        if (!"^[0-9-+]{10,15}$".test(data[property]))
          errors[property] = "please enter valid phone number";
    // if (!data[property].test("^[0-9-+]{10,15}$"))
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
}
