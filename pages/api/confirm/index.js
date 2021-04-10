import nc from "next-connect";
import crypto from "crypto";
import nodemailer from "nodemailer";
import { connectToDatabase } from "../../../util/mongodb";

const handler = nc().post(async (req, res) => {
  const { name, email } = req.body;
  const { db } = await connectToDatabase();

  const user = await db.collection("users").findOne({ email });
  if (!user) return res.status(400).json({ error: "user doesnt exist" });
  if (user.isVerified)
    return res
      .status(200)
      .json({ success: "This account has already been verified" });

  //generate email verification token and save

  //   //TTL Index for auto expiry,will be executed only once for index creation
  //   db.collection("tokens").createIndex(
  //     { createdAt: 1 },
  //     { expireAfterSeconds: 86400 } //1 day in seconds
  //   );

  const token = crypto.randomBytes(128).toString("hex");

  await db.collection("tokens").insertOne(
    {
      createdAt: new Date(),
      token,
    },
    (error) => {
      if (error)
        return res
          .status(500)
          .json({ error: "there was an unknown issue,please try again" });

      //if no error send email
      const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: "basit.prevail@gmail.com",
          pass: "Pe@14012020",
        },
      });
      const mailOptions = {
        from: "basit.prevail@gmail.com",
        to: email,
        subject: "Account Verification Link",
        text:
          "Hello " +
          name +
          ",\n\n" +
          "Please verify your account by clicking the link: \nhttp://" +
          req.headers.host +
          "/api/confirm/" +
          email +
          "/" +
          token +
          "\n\nThank You!\n",
      };
      transporter.sendMail(mailOptions, (err) => {
        if (err) {
          return res
            .status(500)
            .json({ error: "technical issue,please click on resend" });
        }

        return res.status(200).json({
          success:
            "A verification email has been sent to " +
            email +
            ". It will  expire after one day. If you didn't get verification Email click on resend token.",
        });
      });
    }
  );
});

export default handler;
