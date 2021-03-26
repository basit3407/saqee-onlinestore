import { Storage } from "@google-cloud/storage";

export default async function handler(req, res) {
  const storage = new Storage({
    projectId: process.env.GCLOUD_PROJECT,
    credentials: {
      client_email: process.env.CLIENT_EMAIL,
      private_key: process.env.PRIVATE_KEY,
    },
  });
  console.log(req.query);
  const bucket = storage.bucket(process.env.GCS_BUCKET);
  const file = bucket.file("hello world");
  const options = {
    expires: Date.now() + 60 * 60 * 1000, //  1 hour,
    fields: { "x-goog-meta-test": "data" },
  };

  const [response] = await file.generateSignedPostPolicyV4(options);
  console.log(file);
  console.log(response);
  res.status(200).json(response);
}
