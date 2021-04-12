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

  db.collection("users").findOne({ email }, (error, user) => {
    if (error)
      return res
        .status(500)
        .json({ error: "an unknown error occured,please try again" });
    if (!user) return res.status(400).json({ error: "user doesnt exist" });

    const { name } = user;

    const token = crypto.randomBytes(128).toString("hex");
    const hash = crypto.createHash("sha512").update(token).digest("hex");

    db.collection("tokens").insertOne(
      {
        createdAt: new Date(),
        token: hash,
      },
      (error) => {
        if (error)
          return res
            .status(500)
            .json({ error: "there was an unknown issue,please try again" });

        sgMail.setApiKey(process.env.SENDGRID_API_KEY);

        const msg = {
          to: email,
          from: "bm@basitminhas.com",
          subject: "Saqee's Online Store",
          text:
            "Hello " +
            name +
            ",\n\n" +
            "Please reset your password by clicking the link:" +
            process.env.CLIENT_URL +
            "api/forgot/" +
            email +
            "/" +
            token +
            "\n\nThank You!\n",
        };

        sgMail
          .send(msg)
          .then(() => {
            res.status(200).json({
              message:
                "Password reset link has been sent to  " +
                email +
                ". It will  expire after one day. If you didn't get the link,Kindly click again on reset password.",
            });
          })
          .catch((error) => {
            console.error(error);
            res
              .status(500)
              .json({ error: "technical issue,please click on resend" });
          });
      }
    );
  });
});

export default handler;
