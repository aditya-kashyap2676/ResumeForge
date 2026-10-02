import express from "express";
import {
  registerUser,
  loginUser,
  getUserProfile,
} from "../Controller/authController.js";
import protect from "../Middlewares/authMiddleware.js";
import upload from "../Middlewares/uploadMiddleware.js";
import { storeImage } from "../Config/imageStorage.js";

const router = express.Router();

// Auth Routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getUserProfile);

// Upload profile image
router.post("/upload-image", upload.single("image"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      message: "No file uploaded",
    });
  }

  try {
    const imageUrl = await storeImage(req.file, {
      folder: "resumeforge/profile-images",
      baseUrl: `${req.protocol}://${req.get("host")}`,
    });

    return res.status(200).json({ imageUrl });
  } catch (error) {
    return res.status(500).json({
      message: "Image upload failed",
      error: error.message,
    });
  }
});

export default router;