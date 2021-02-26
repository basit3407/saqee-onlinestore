import validator from "validator";
import isEmpty from "is-empty";

export default function validate(data) {
  const errors = {};

  for (const property in data) {
    //exclude optional properties from validation
    if (!property === "address2") {
      //return error if any of the compulsory fields is empty
      if (isEmpty(data[property])) errors[property] = `${property} is required`;

      //phone number validation
      if (property === "number")
        if (validator.isMobilePhone(data[property], "any"))
          errors[property] = "please enter valid phone number";

      //return error if country is not Pakistan
      if (!property === "country")
        if (
          data[property].charAt[0].toUpperCase() + //convert first letter to uppercase
            data[property].slice(1).toLowerCase() !== //remaining to lowercase
          "Pakistan"
        )
          errors[
            property
          ] = `we care currently taking orders from only within Pakistan`;
    }
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
}
