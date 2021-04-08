import nextConnect from "next-connect";
import auth from "../../middleware/auth";
import { deleteUser, updateUserByEmail } from "../../lib/db";

const handler = nextConnect();

handler
  .use(auth)
  .get((req, res) => {
    // You do not generally want to return the whole user object
    // because it may contain sensitive field such as !!password!! Only return what needed
    // const { name, email, favoriteColor } = req.user
    // res.json({ user: { name, email, favoriteColor } })
    console.log("get", req.user);
    res.json({ user: req.user });
  })
  .use((req, res, next) => {
    console.log("use ", req.user);
    // handlers after this (PUT, DELETE) all require an authenticated user
    // This middleware to check if user is authenticated before continuing
    if (!req.user) {
      res.status(401).json({ error: "unauthenticated" });
    } else {
      next();
    }
  })
  .put(async (req, res) => {
    const updatedUser = req.body;
    console.log("put", req.user);

    const user = await updateUserByEmail(req.user.email, updatedUser);
    console.log("user = ", user);
    res.json({ user: user });
  })
  .delete((req, res) => {
    deleteUser(req.body.email);
    req.logOut();
    res.status(204).end();
  });

export default handler;
