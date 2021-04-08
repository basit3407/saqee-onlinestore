import nextConnect from "next-connect";
import argon2 from "argon2";
// import argon2 from "argon2";
import auth from "../../middleware/auth";
import { getAllUsers, createUser } from "../../lib/db";
import validate from "../../validation/user";

const handler = nextConnect();

handler
  .use(auth)
  .get((req, res) => {
    // For demo purpose only. You will never have an endpoint which returns all users.
    // Remove this in production
    res.json({ users: getAllUsers(req) });
  })
  .post((req, res) => {
    const user = req.body;

    validate(user).then(async ({ errors, isValid }) => {
      if (!isValid) return res.status(400).json(errors); //if not valid retrun error

      // Security-wise, you must hash the password before saving it
      const hashedPass = await argon2.hash(user.password);
      const securedUser = { ...user, password: hashedPass };
      createUser(securedUser);
      req.logIn(securedUser, (err) => {
        if (err) throw err;
        // Log the signed up user in
        res.status(201).json({
          securedUser,
        });
      });
    });
  });

export default handler;
