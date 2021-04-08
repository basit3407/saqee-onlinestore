import nextConnect from "next-connect";
import { findUserByEmail } from "../lib/db";
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
    const { email } = req.body;
    const user = await findUserByEmail(email);
    if (user) req.session.user = user;

    // Initialize mocked database
    // Remove this after you add your own database
    // req.session.users = req.session.users || [];
    next();
  })
  .use(passport.initialize())
  .use(passport.session());

export default auth;
