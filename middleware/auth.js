import nextConnect from "next-connect";
import { findUserByUsername } from "../lib/db";
import passport from "../lib/passport";
import session from "../lib/session";

const auth = nextConnect()
  .use(
    session({
      name: "sess",
      secret: process.env.TOKEN_SECRET,
      cookie: {
        maxAge: 60 * 60 * 8, // 8 hours,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        sameSite: "lax",
      },
    })
  )
  .use(async (req, res, next) => {
    const { username } = req.body;
    const user = await findUserByUsername(username);
    if (user) req.session.user = user;
    next();
  })
  .use(passport.initialize())
  .use(passport.session());

export default auth;
