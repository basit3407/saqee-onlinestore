import Multer, { memoryStorage } from "multer";
import { Storage } from "@google-cloud/storage";

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};

// const { privateKey } = JSON.parse(process.env.GCS_PRIVATE_KEY); //For production;
const privateKey = process.env.GCS_PRIVATE_KEY; // For development

const storage = new Storage({
  projectId: process.env.GCLOUD_PROJECT,
  credentials: {
    client_email: process.env.GCS_CLIENT_EMAIL,
    private_key: privateKey,
  },
});

const bucket = storage.bucket(process.env.GCS_BUCKET);

const multer = Multer({
  storage: memoryStorage(),
});

export default (req, res) =>
  multer.single("productImage")(req, res, (err) => {
    const {
      body: { category },
      file: { originalname },
    } = req;

    if (err)
      return res
        .status(500)
        .json({ error: "there was some issue please try again" });

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded." });
    }

    // Create a new blob in the bucket and upload the file data.
    const blob = bucket.file(`${category}/${originalname}`);
    const blobStream = blob.createWriteStream();

    blobStream.on("error", (err) => {
      if (err)
        res.status(400).json({ error: "Image with this name already exists" });
    });

    blobStream.on("finish", () => {
      // The public URL can be used to directly access the file via HTTP.
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
      res.status(200).json({ url: publicUrl });
    });

    blobStream.end(req.file.buffer);
  });
