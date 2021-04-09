import nextConnect from "next-connect";
import auth from "../../middleware/auth";
import { deleteUser, updateUserByEmail } from "../../lib/db";

const handler = nextConnect();

handler
  .use(auth)
  .get((req, res) => {
    // You do not generally want to return the whole user object
    // because it may contain sensitive field such as !!password!! Only return what needed
    if (req.user) {
      const { name, email, isAdmin } = req.user;

      return res.json({
        user: {
          name,
          email,
          ...(isAdmin && { isAdmin }),
        },
      });
    }
    res.status(400).json({ error: "no user present" });
  })
  .use((req, res, next) => {
    // handlers after this (PUT, DELETE) all require an authenticated user
    // This middleware to check if user is authenticated before continuing
    if (!req.user) {
      res.status(401).json({ error: "unauthenticated" });
    } else {
      next();
    }
  })
  .put(async (req, res) => {
    const { email, update } = req.body;

    const user = await updateUserByEmail(email, update);
    if (!user)
      return res.status(404).json({ email: "This user is not registered" });
    const { name } = user;
    res.json({ user: { name, email } });
  })
  .delete((req, res) => {
    deleteUser(req.body.email);
    req.logOut();
    res.status(204).end();
  });

export default handler;
