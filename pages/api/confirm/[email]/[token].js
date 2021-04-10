import { connectToDatabase } from "../../../../util/mongodb";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default async function emailVerificationHandler(req, res) {
  const { email, token } = req.query;

  const { db } = await connectToDatabase();
  db.collection("tokens").findOne({ token }, (error, token) => {
    if (error)
      return sendResponse(
        req,
        res,
        "There is some unknown issue,Please try again"
      );

    // return res
    //   .status(500)
    //   .json({ error: "There is some unknown issue,Please try again" });

    // token is not found into database i.e. token may have expired
    if (!token)
      return sendResponse(
        req,
        res,
        "Your token may have expired,Please click on resend "
      );

    // return res
    //   .status(400)
    //   .json({ error: "Your token may have expired,Please click on resend " });

    // if token is found then check valid user
    db.collection("users").findOne({ email }, async (error, user) => {
      if (error)
        return sendResponse(
          req,
          res,
          "There is some unknown issue,Please try again"
        );
      // return res
      //   .status(500)
      //   .json({ error: "There as some unknown issue,Please try again" });

      if (!user) return sendResponse(req, res, "This user is not registered");

      // return res.status(400).json({ error: "This user is not registered" });

      if (user.isVerified)
        return sendResponse(req, res, "This user has already been verified");
      // return res
      //   .status(200)
      //   .json({ message: "This user has already been verfied" });

      //set is verified to true
      await db
        .collection("users")
        .findOneAndUpdate(
          { email },
          { $set: { isVerified: true } },
          (error) => {
            if (error)
              return sendResponse(
                req,
                res,
                "There is some unknown issue,Please try again"
              );
            // return res.status(500).json({
            //   error: "There was some unknown issue,Please try again",
            // });

            sendResponse(req, res, "account verified successfully");

            // return res
            //   .status(200)
            //   .json({ message: "account verified successfully" });
          }
        );
    });
  });
}

const sendResponse = (req, res, message) =>
  res.redirect(`http://${req.headers.host}/email/${message}`);
