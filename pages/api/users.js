import nextConnect from "next-connect";
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

    validate(user).then(({ errors, isValid }) => {
      if (!isValid) return res.status(400).json(errors); //if not valid retrun error

      createUser(user);
      req.logIn(user, (err) => {
        if (err) throw err;
        const { email, name } = user;
        // Log the signed up user in
        res.status(201).json({
          user: { name, email },
        });
      });
    });
  });

export default handler;
