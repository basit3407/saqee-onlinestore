import nextConnect from "next-connect";
import auth from "../../middleware/auth";
import passport from "../../lib/passport";

const handler = nextConnect();

handler.use(auth).post(passport.authenticate("local"), (req, res) => {
  const { name, email } = req.user;
  res.json({ user: { name, email } });
});

export default handler;
