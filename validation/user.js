import { findUserByEmail } from "../lib/db";
import { validateEmail, validatePassword } from "./email";
import { isEmpty } from "./product";

export default async function validate(data) {
  let errors = {};

  for (const property in data) {
    //Empty Fields validation
    if (!data[property])
      errors[property] = `${property.charAt(0).toUpperCase()}${property
        .slice(1)
        .replace(/([A-Z])/g, " $1")} is required`;
    //email validation
    else if (property === "email" && !validateEmail(data[property]))
      errors[property] = "Please enter valid email address";
    else if (property === "password" && !validatePassword(data[property]))
      errors[property] =
        "Password should consist of minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:";
  }
  //duplicate email validation
  if (!errors.email) {
    const userNameExists = await findUserByEmail(data.email);
    if (userNameExists) errors.email = "This email already exists";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
}
