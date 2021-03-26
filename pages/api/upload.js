import multer from "multer";
import MulterGoogleCloudStorage from "multer-google-storage";

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};

const uploadHandler = multer({
  storage: new MulterGoogleCloudStorage(),
});

export default (req, res) =>
  uploadHandler.single("productImage")(req, res, (err) =>
    !err
      ? res.status(200).json(req.file)
      : res
          .status(500)
          .json({ error: "an error occured while uploading,plesae try again" })
  );
