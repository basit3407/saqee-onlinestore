import nc from "next-connect";
import crypto from "crypto";
import { connectToDatabase } from "../../util/mongodb";

const handler = nc().put(async (req, res) => {
  const { email, password, token } = req.body;

  console.log(token);

  const { db } = await connectToDatabase();

  const hash = crypto.createHash("sha512").update(token).digest("hex");
  console.log(hash);

  db.collection("tokens").findOne({ token: hash }, (error, token) => {
    console.log(token);
    if (error)
      return res
        .status(500)
        .json({ error: "an unknown error occured,please try again" });

    if (!token)
      return res
        .status(400)
        .json({ error: "your token may have expired,please click on resend" });

    db.collection("users").findOne({ email }, (error, user) => {
      if (error)
        return res
          .status(500)
          .json({ error: "an unknown error occured,please try again" });

      if (!user)
        return res.status(400).json({ error: "This user is not registered" });

      const salt = crypto.randomBytes(16).toString("hex");
      const hash = crypto
        .pbkdf2Sync(password, salt, 1000, 64, "sha512")
        .toString("hex");

      db.collection("users").findOneAndUpdate(
        { email },
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
