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
  // req.session.users.push(user);
}

export async function findUserByUsername(username) {
  // Here you find the user based on id/username in the database
  const { db } = await connectToDatabase();
  const user = await db.collection("users").findOne({ username: username });
  console.log("user = ", user);
  return user;

  //   return req.session.users.find((user) => user.username === username);
}

export async function updateUserByUsername(req, username, update) {
  // Here you update the user based on id/username in the database
  const { db } = await connectToDatabase();
  await db
    .collection("users")
    .updateOne({ username: username }, { $set: update });

  const user = req.session.users.find((u) => u.username === username);
  Object.assign(user, update);
  return user;
}

export async function deleteUser(req, username) {
  // Here you should delete the user in the database
  const { db } = await connectToDatabase();
  await db.collection("users").deleteOne({ username: username });
  req.session.users = req.session.users.filter(
    (user) => user.username !== req.user.username
  );
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
