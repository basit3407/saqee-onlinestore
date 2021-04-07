import nextConnect from "next-connect";
import passport from "../lib/passport";
import session from "../lib/session";
// import { connectToDatabase } from "../util/mongodb";

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
  // .use((req, res, next) => {
  //   const { db } = connectToDatabase();
  //   const users = db.collection("users").find().toArray();

  //   req.session.users = users || [];

  //   // // Initialize mocked database
  //   // // Remove this after you add your own database
  //   // req.session.users = req.session.users || [];
  //   next();
  // })
  .use(passport.initialize())
  .use(passport.session());

export default auth;
