import multer from "multer";
import path from "path";
// configure storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
// file filter
const fileFilter = (req, file, cb) => {
    const allowtypes = [".jpeg", ".jpg", ".png", ".webp"];
    const fileExtension = path.extname(file.originalname).toLowerCase();
    if (allowtypes.includes(fileExtension)) {
        cb(null, true);
    } else {
        cb(new Error("Only jpg, jpeg, png and webp formats are allowed"), false);
    }
};
const upload = multer({
    storage,
    fileFilter
});
export default upload;