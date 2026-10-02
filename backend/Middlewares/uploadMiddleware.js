import multer from "multer";
import path from "path";

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
  storage: multer.memoryStorage(),
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

export default upload;