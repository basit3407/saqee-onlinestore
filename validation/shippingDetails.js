import isEmpty from "is-empty";

export default function validate(data) {
  const errors = {};

  for (const property in data) {
    //exclude optional properties from validation
    if (property !== "address2")
      if (isEmpty(data[property]))
        //return error if any of the compulsory fields is empty
        errors[property] = `${property} is required`;
      //phone number validation
      else if (property === "number")
        if (!data[property].match("^[0-9-+]{10,15}$"))
          errors[property] = "please enter valid phone number";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
}
