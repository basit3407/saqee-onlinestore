import crypto from "crypto";
import { connectToDatabase } from "../../../../util/mongodb";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default async function forgotPasswordHandler(req, res) {
  const { email, token } = req.query;
  console.log(email);
  console.log(token);
  const { db } = await connectToDatabase();

  const hash = crypto.createHash("sha512").update(token).digest("hex");

  db.collection("tokens").findOne({ token: hash }, (error, token) => {
    if (error)
      return sendResponse(
        token.token,
        res,
        "an unknown issue occurred,please click on resend if issue persists"
      );
    if (!token)
      return sendResponse(
        token.token,
        res,
        "your token may have expired,please click on resend"
      );

    db.collection("users").findOne({ email }, (error, user) => {
      if (error)
        return sendResponse(
          token.token,
          res,
          "an unknown issue occurred,please click on resend if issue persists"
        );

      if (!user) return sendResponse(token.token, res, "no such user exists");

      sendResponse(token.token, res, "done", "done");
    });
  });
}

const sendResponse = (token, res, message, status) =>
  res.redirect(
    `${process.env.CLIENT_URL}forgot/${token}?message=${message}&status=${status}`
  );
