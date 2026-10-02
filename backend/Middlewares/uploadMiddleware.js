import multer from "multer";
import path from "path";
import { ensureUploadsDir } from "../Config/uploads.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    try {
      cb(null, ensureUploadsDir());
    } catch (error) {
      cb(error);
    }
  },

  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname).toLowerCase();
    const fileName = `${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}${extension}`;

    cb(null, fileName);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedExtensions = [
    ".jpeg",
    ".jpg",
    ".png",
    ".webp",
  ];

  const extension = path
    .extname(file.originalname)
    .toLowerCase();

  console.log("File received:", {
    name: file.originalname,
    mimeType: file.mimetype,
    extension,
  });

  if (allowedExtensions.includes(extension)) {
    return cb(null, true);
  }

  return cb(
    new Error(
      "Only JPEG, JPG, PNG and WEBP images are allowed"
    ),
    false
  );
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

export default upload;