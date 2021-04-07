import { findUserByUsername } from "../lib/db";
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
    else if (property === "username" && !validateEmail(data[property]))
      errors[property] = "Please enter valid email address";
  }
  //duplicate username validation
  if (!errors.username) {
    const userNameExists = await findUserByUsername(data.username);
    if (userNameExists) errors.username = "This username already exists";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
}

export const validateEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email.toLowerCase());
};
