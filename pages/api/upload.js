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

export default (req, res) => {
  uploadHandler.single("productImage")(req, {}, (err) => {
    // do error handling here
    !err && res.status(200).json({ image: req.file.originalname }); // do something with the files here
  });
};
