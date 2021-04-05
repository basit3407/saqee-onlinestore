import { getSession } from "next-auth/client";
import { connectToDatabase } from "../../../util/mongodb";

export default async function usersHandler(req, res) {
  const session = await getSession({ req });

  if (session) {
    try {
      const { db } = await connectToDatabase(),
        { email } = session.user,
        user = db.collection("users").findAndModify({
          query: { email: email },
          update: {
            $setOnInsert: { email: email },
          },
          new: true, // return new doc if one is upserted
          upsert: true, // insert the document if it does not exist
        });

      res.status(200).json(user);
    } catch (e) {
      res.status(500).json({ error: "there was some issue please try again" });
    }
  } else res.status(401).json({ error: "invalid email" });
}
