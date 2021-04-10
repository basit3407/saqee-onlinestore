import { updateUserByEmail } from "../../../../lib/db";
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
    console.log(token);
    if (error)
      return res
        .status(500)
        .json({ error: "There as some unknown issue,Please try again" });

    // token is not found into database i.e. token may have expired
    if (!token)
      return res
        .status(400)
        .json({ error: "Your token may have expired,Please click on resend " });

    // if token is found then check valid user
    db.collection("users").findOne({ email }, async (error, user) => {
      console.log(user);
      if (error)
        return res
          .status(500)
          .json({ error: "There as some unknown issue,Please try again" });

      if (!user)
        return res.status(400).json({ error: "This user is not registered" });

      if (user.isVerified)
        return res
          .status(200)
          .json({ message: "This user has already been verfieds" });

      try {
        const user = await updateUserByEmail(email, { isVerified: true });
        if (user)
          return res
            .status(200)
            .json({ message: "account verifed successfully" });
      } catch (e) {
        return res
          .status(500)
          .json({ error: "There was some unknown issue,Please try again" });
      }

      //set is verified to true
    });
  });
}
