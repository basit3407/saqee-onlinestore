import nc from "next-connect";
import crypto from "crypto";
import sgMail from "@sendgrid/mail";
import { connectToDatabase } from "../../../util/mongodb";

export const config = {
  api: {
    externalResolver: true,
  },
};
const handler = nc().post(async (req, res) => {
  const { email } = req.body;
  const { db } = await connectToDatabase();

  // generate email verification token and save

  // //TTL Index for auto expiry,will be executed only once for index creation
  // db.collection("tokens-email").createIndex(
  //   { createdAt: 1 },
  //   { expireAfterSeconds: 3600 } //1 hour in seconds
  // );

  db.collection("users").findOne({ email }, (error, user) => {
    if (error)
      return res
        .status(500)
        .json({ error: "an unknown error occured,please try again" });
    if (!user) return res.status(400).json({ error: "user doesnt exist" });
    if (user.isVerified)
      return res
        .status(200)
        .json({ success: "This account has already been verified" });

    const { name } = user;

    //check if token already exists for this user;
    db.collection("tokens-email").findOne({ email }, (error, token) => {
      if (error)
        return res
          .status(500)
          .json({ error: "an unknown error occured,please try again" });

      //if token already exists,delete this token.
      if (token)
        db.collection("tokens-email").deleteOne({ email }, (error) => {
          if (error)
            return res
              .status(500)
              .json({ error: "an unknown error occured,please try again" });
        });

      //Create new token and save in db
      const newToken = crypto.randomBytes(128).toString("hex");

      db.collection("tokens-email").insertOne(
        {
          createdAt: new Date(),
          token: newToken,
          email,
        },
        (error) => {
          if (error)
            return res
              .status(500)
              .json({ error: "there was an unknown issue,please try again" });

          sgMail.setApiKey(process.env.SENDGRID_API_KEY);
          const msg = {
            to: email, // Change to your recipient
            from: "saqeeOnlineStore@gmail.com", // Change to your verified sender
            subject: "Saqee's Online Store",
            text:
              "Hello " +
              name +
              ",\n\n" +
              "Please verify your account by clicking the link:" +
              process.env.CLIENT_URL +
              "api/confirm/" +
              newToken +
              "\n\nThank You!\n",
          };
          sgMail
            .send(msg)
            .then(() =>
              res.status(200).json({
                success:
                  "A verification email has been sent to " +
                  email +
                  ". It will  expire after one hour. If you didn't get verification Email click on resend token.",
              })
            )
            .catch(() =>
              res
                .status(500)
                .json({ error: "technical issue,please click on resend" })
            );
        }
      );
    });
  });
});

export default handler;
