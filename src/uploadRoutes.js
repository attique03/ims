import path from "path";
import express from "express";
import multer from "multer";
const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/"); // upload is where we wanna upload, which is file uploads
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Images Only!");
  }
}

// there is like we pass an middleware to the route
const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

// just adding '/' since this file is gonna connected to api/upload and passing upload as middleware
router.post("/", upload.single("image"), (req, res) => {
  // we wanna send back the path, and we will pass this in Screen in FrontEnd
  res.send(`/${req.file.path}`);
});

export default router;
