import { connectToDatabase } from "../../../util/mongodb";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default async function emailVerificationHandler(req, res) {
  const { token } = req.query;

  const { db } = await connectToDatabase();
  db.collection("tokens-email").findOne({ token }, (error, token) => {
    if (error)
      return sendResponse(res, "There is some unknown issue,Please try again");

    if (!token)
      return sendResponse(
        res,
        "Invalid or expired token,Please click on resend "
      );

    // if token is found then check valid user
    db.collection("users").findOne(
      { email: token.email },
      async (error, user) => {
        if (error)
          return sendResponse(
            res,
            "There is some unknown issue,Please try again"
          );

        if (!user)
          return sendResponse(req, res, "Invalid or unregistered user");

        if (user.isVerified)
          return sendResponse(
            res,
            "This user has already been verified",
            "done"
          );

        //set is verified to true
        await db
          .collection("users")
          .findOneAndUpdate(
            { email: token.email },
            { $set: { isVerified: true } },
            (error) => {
              if (error)
                return sendResponse(
                  req,
                  res,
                  "There is some unknown issue,Please try again"
                );

              sendResponse(res, "account verified successfully", "done");
            }
          );
      }
    );
  });
}

const sendResponse = (res, message, status) =>
  res.redirect(
    `${process.env.CLIENT_URL}email/verify?message=${message}&status=${status}`
  );
