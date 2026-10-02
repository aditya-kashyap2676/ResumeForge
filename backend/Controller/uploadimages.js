import Resume from "../Models/Resume.js";
import upload from "../Middlewares/uploadMiddleware.js";
import { deleteStoredImage, storeImage } from "../Config/imageStorage.js";

const uploadResumeImages = (req, res) => {
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "profileImage", maxCount: 1 },
  ])(req, res, async (err) => {
    if (err) {
      return res.status(400).json({
        message: "File Upload Failed",
        error: err.message,
      });
    }

    const uploadedImageUrls = [];

    try {
      const resume = await Resume.findOne({
        _id: req.params.id,
        userId: req.user._id,
      });

      if (!resume) {
        return res.status(404).json({
          message: "Resume not found or unauthorized",
        });
      }

      const baseUrl = `${req.protocol}://${req.get("host")}`;

      const newThumbnail = req.files?.thumbnail?.[0];
      const newProfileImage = req.files?.profileImage?.[0];

      if (!newThumbnail && !newProfileImage) {
        return res.status(400).json({
          message: "No image received",
        });
      }

      const oldImageUrls = [];

      if (newThumbnail) {
        const oldUrl = resume.thumbnailLink;
        const newUrl = await storeImage(newThumbnail, {
          folder: "resumeforge/resume-thumbnails",
          baseUrl,
        });
        uploadedImageUrls.push(newUrl);
        resume.thumbnailLink = newUrl;
        if (oldUrl) oldImageUrls.push(oldUrl);
      }

      if (newProfileImage) {
        if (!resume.profileInfo) {
          resume.profileInfo = {};
        }

        const oldUrl = resume.profileInfo.profilePreviewUrl;
        const newUrl = await storeImage(newProfileImage, {
          folder: "resumeforge/resume-profile-images",
          baseUrl,
        });
        uploadedImageUrls.push(newUrl);
        resume.profileInfo.profilePreviewUrl = newUrl;
        if (oldUrl) oldImageUrls.push(oldUrl);
      }

      await resume.save();

      await Promise.all(oldImageUrls.map(async (url) => {
        try {
          await deleteStoredImage(url);
        } catch (error) {
          console.error("Error deleting replaced image:", error);
        }
      }));

      return res.status(200).json({
        message: "Image uploaded successfully",
        thumbnailLink: resume.thumbnailLink,
        profilePreviewUrl: resume.profileInfo?.profilePreviewUrl,
      });
    } catch (error) {
      await Promise.all(uploadedImageUrls.map((url) =>
        deleteStoredImage(url).catch((cleanupError) => {
          console.error("Error cleaning up failed upload:", cleanupError);
        })
      ));
      console.error("Error uploading images:", error);

      return res.status(500).json({
        message: "Failed to upload images",
        error: error.message,
      });
    }
  });
};

export default uploadResumeImages;