import crypto from "crypto";
import { connectToDatabase } from "../util/mongodb";

export async function getAllUsers() {
  // // For demo purpose only. You are not likely to have to return all users.
  // return req.session.users;

  const { db } = await connectToDatabase();
  const users = await db.collection("users").find().toArray();
  return users;
}

export async function createUser({ email, password, name }) {
  // Here you should create the user and save the salt and hashed password (some dbs may have
  // authentication methods that will do it for you so you don't have to worry about it):
  // const salt = crypto.randomBytes(16).toString("hex");
  // const hash = crypto
  //   .pbkdf2Sync(password, salt, 1000, 64, "sha512")
  //   .toString("hex");
  const user = {
    createdAt: Date.now(),
    email,
    password,
    name,
  };

  // Here you should insert the user into the database
  const { db } = await connectToDatabase();
  db.collection("users").insertOne(user);
}

export async function findUserByEmail(email) {
  // Here you find the user based on id/email in the database
  const { db } = await connectToDatabase();
  const user = await db.collection("users").findOne({ email: email });
  return user;
}

export async function updateUserByEmail(email, update) {
  // Here you update the user based on id/email in the database
  const { db } = await connectToDatabase();
  const user = await db
    .collection("users")
    .findOneAndUpdate(
      { email: email },
      { $set: update },
      { returnOriginal: false }
    );

  return user.value;
}

export async function deleteUser(email) {
  // Here you should delete the user in the database
  const { db } = await connectToDatabase();
  db.collection("users").deleteOne({ email: email });
}

// // Compare the password of an already fetched user (using `findUserByUsername`) and compare the
// // password for a potential match
// export function validatePassword(user, inputPassword) {
//   const inputHash = crypto
//     .pbkdf2Sync(inputPassword, user.salt, 1000, 64, "sha512")
//     .toString("hex");
//   const passwordsMatch = user.hash === inputHash;
//   return passwordsMatch;
// }
