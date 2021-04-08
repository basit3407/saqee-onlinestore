import passport from "passport";
import LocalStrategy from "passport-local";
import argon2 from "argon2";
import { findUserByEmail } from "./db";

passport.serializeUser(function (user, done) {
  // serialize the email into session
  done(null, user.email);
});

passport.deserializeUser(async function (req, email, done) {
  // deserialize the email back into user object
  const user = await findUserByEmail(email);
  done(null, user);
});

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      // Here you lookup the user in your DB and compare the password/hashed password
      const user = await findUserByEmail(email);
      user && (await argon2.verify(user.password, password))
        ? done(null, user)
        : done(null, null);
    }
  )
);

export default passport;
