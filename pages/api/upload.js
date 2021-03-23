import multer from "multer";
import fs from "fs-extra";

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const path = `./public/images/${req.body.category}`;
    fs.mkdirsSync(path);
    cb(null, path);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

export default (req, res) => {
  upload.single("productImage")(req, res, (err) => {
    // do error handling here
    // !err && res.status(200).json({ image: req.file.originalname }); // do something with the files here
  });
  res.status(200).json({});
};
