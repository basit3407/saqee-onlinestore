import multer from "multer";
import fs from "fs-extra";

export const config = {
  api: {
    bodyParser: false,
  },
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const { category } = req.body,
      path = `./public/images/${category}`;
    fs.mkdirsSync(path);

    cb(null, path);
  },
  filename: function (req, file, cb) {
    const { title } = req.body;
    cb(null, title);
  },
});

const upload = multer({ storage: storage });

export default (req, res) => {
  upload.array("iphoneAdPix", 3)(req, {}, (err) => {
    console.log(req.body);
    // do error handling ere
    console.log(req.files[0].fieldname); // do something with the files here
  });
  res.status(200).json({});
};
