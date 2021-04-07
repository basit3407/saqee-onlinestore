import crypto from "crypto";
import { connectToDatabase } from "../util/mongodb";

export async function getAllUsers() {
  // // For demo purpose only. You are not likely to have to return all users.
  // return req.session.users;

  const { db } = await connectToDatabase();
  const users = await db.collection("users").find().toArray();
  return users;
}

export async function createUser({ username, password, name }) {
  // Here you should create the user and save the salt and hashed password (some dbs may have
  // authentication methods that will do it for you so you don't have to worry about it):
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, "sha512")
    .toString("hex");
  const user = {
    createdAt: Date.now(),
    username,
    name,
    hash,
    salt,
  };

  // Here you should insert the user into the database
  const { db } = await connectToDatabase();
  db.collection("users").insertOne(user);
}

export async function findUserByUsername(username) {
  // Here you find the user based on id/username in the database
  const { db } = await connectToDatabase();
  const user = await db.collection("users").findOne({ username: username });
  return user;
}

export async function updateUserByUsername(username, update) {
  // Here you update the user based on id/username in the database
  const { db } = await connectToDatabase();
  const user = await db
    .collection("users")
    .findOneAndUpdate(
      { username: username },
      { $set: update },
      { returnNewDocument: true }
    );

  return user.value;
}

export async function deleteUser(username) {
  // Here you should delete the user in the database
  const { db } = await connectToDatabase();
  db.collection("users").deleteOne({ username: username });
}

// Compare the password of an already fetched user (using `findUserByUsername`) and compare the
// password for a potential match
export function validatePassword(user, inputPassword) {
  const inputHash = crypto
    .pbkdf2Sync(inputPassword, user.salt, 1000, 64, "sha512")
    .toString("hex");
  const passwordsMatch = user.hash === inputHash;
  return passwordsMatch;
}
