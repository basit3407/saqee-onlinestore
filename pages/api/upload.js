import Multer, { memoryStorage } from "multer";
import { Storage } from "@google-cloud/storage";

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};

const storage = new Storage({
  projectId: process.env.GCLOUD_PROJECT,
  credentials: {
    client_email: process.env.GCS_CLIENT_EMAIL,
    private_key: process.env.GCS_PRIVATE_KEY,
  },
});

const bucket = storage.bucket(process.env.GCS_BUCKET);

const multer = Multer({
  storage: memoryStorage(),
});

export default (req, res) =>
  multer.single("productImage")(req, res, () => {
    if (!req.file) {
      res.status(400).send("No file uploaded.");
      return;
    }

    // Create a new blob in the bucket and upload the file data.
    const blob = bucket.file(req.file.originalname);
    const blobStream = blob.createWriteStream();

    // blobStream.on("error", (err) => {
    //   if (err) {
    //     res.status(500).end();
    //   }
    // });

    blobStream.on("finish", () => {
      // The public URL can be used to directly access the file via HTTP.
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
      res.status(200).json({ url: publicUrl });
    });

    blobStream.end(req.file.buffer);
  });
