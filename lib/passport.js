import passport from "passport";
import LocalStrategy from "passport-local";
import { findUserByUsername, validatePassword } from "./db";

passport.serializeUser(function (user, done) {
  // serialize the username into session
  done(null, user.username);
});

passport.deserializeUser(async function (req, username, done) {
  // deserialize the username back into user object
  const user = await findUserByUsername(username);
  done(null, user);
});

passport.use(
  new LocalStrategy(
    { passReqToCallback: true },
    async (req, username, password, done) => {
      // Here you lookup the user in your DB and compare the password/hashed password
      const user = await findUserByUsername(username);
      if (!user || !validatePassword(user, password)) {
        done(null, null);
      } else {
        done(null, user);
      }
    }
  )
);

export default passport;
