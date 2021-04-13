import nc from "next-connect";
import crypto from "crypto";
import { connectToDatabase } from "../../util/mongodb";
import { validatePassword } from "../../validation/email";

const handler = nc().put(async (req, res) => {
  const { password, token } = req.body;

  if (!validatePassword(password))
    return res.status(400).json({
      password:
        "Password should consist of minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character",
    });

  const { db } = await connectToDatabase();

  const hash = crypto.createHash("sha512").update(token).digest("hex");

  db.collection("tokens-password").findOne({ token: hash }, (error, token) => {
    if (error)
      return res
        .status(500)
        .json({ error: "an unknown error occured,please try again" });

    if (!token)
      return res.status(400).json({
        error: "invalid or expired token,please click on resend",
      });

    db.collection("users").findOne({ email: token.email }, (error, user) => {
      if (error)
        return res
          .status(500)
          .json({ error: "an unknown error occured,please try again" });

      if (!user)
        return res.status(400).json({ error: "invalid or unregistered user" });

      const salt = crypto.randomBytes(16).toString("hex");
      const hash = crypto
        .pbkdf2Sync(password, salt, 1000, 64, "sha512")
        .toString("hex");

      db.collection("users").findOneAndUpdate(
        { email: token.email },
        { $set: { salt, hash } },
        (error) => {
          if (error)
            return res
              .status(500)
              .json({ error: "an unknown error occured,please try again" });

          res.status(200).json({ message: "password updated successfully" });
        }
      );
    });
  });
});

export default handler;
