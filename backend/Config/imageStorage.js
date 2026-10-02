import fs from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { v2 as cloudinary } from "cloudinary";
import { ensureUploadsDir, getUploadsDir } from "./uploads.js";

const cloudinaryEnvKeys = [
  "CLOUDINARY_CLOUD_NAME",
  "CLOUDINARY_API_KEY",
  "CLOUDINARY_API_SECRET",
];

export const isCloudinaryConfigured = () =>
  cloudinaryEnvKeys.every((key) => Boolean(process.env[key]));

const configureCloudinary = () => {
  const configuredCount = cloudinaryEnvKeys.filter((key) => Boolean(process.env[key])).length;

  if (configuredCount > 0 && configuredCount < cloudinaryEnvKeys.length) {
    throw new Error("Cloudinary configuration is incomplete.");
  }

  if (configuredCount === cloudinaryEnvKeys.length) {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      secure: true,
    });
    return true;
  }

  return false;
};

export const storeImage = async (file, { folder, baseUrl }) => {
  if (!file?.buffer) {
    throw new Error("No image data received.");
  }

  if (configureCloudinary()) {
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder, resource_type: "image" },
        (error, uploadedImage) => {
          if (error) {
            reject(error);
          } else {
            resolve(uploadedImage);
          }
        }
      );

      stream.end(file.buffer);
    });

    return result.secure_url;
  }

  const extension = path.extname(file.originalname).toLowerCase() || ".jpg";
  const filename = `${Date.now()}-${randomUUID()}${extension}`;
  const uploadsDir = ensureUploadsDir();
  await fs.writeFile(path.join(uploadsDir, filename), file.buffer);

  return `${baseUrl}/uploads/${filename}`;
};

const getCloudinaryPublicId = (imageUrl) => {
  try {
    const url = new URL(imageUrl);
    if (url.hostname !== "res.cloudinary.com") return null;

    const segments = url.pathname.split("/").filter(Boolean);
    const uploadIndex = segments.indexOf("upload");
    if (uploadIndex === -1) return null;

    const assetSegments = segments.slice(uploadIndex + 1);
    const versionIndex = assetSegments.findIndex((segment) => /^v\d+$/.test(segment));
    const publicIdSegments = versionIndex === -1
      ? assetSegments
      : assetSegments.slice(versionIndex + 1);

    if (publicIdSegments.length === 0) return null;

    const filename = publicIdSegments.pop().replace(/\.[^.]+$/, "");
    return [...publicIdSegments, filename].join("/");
  } catch {
    return null;
  }
};

export const deleteStoredImage = async (imageUrl) => {
  if (!imageUrl || typeof imageUrl !== "string") return;

  const publicId = getCloudinaryPublicId(imageUrl);
  if (publicId) {
    if (!configureCloudinary()) return;
    await cloudinary.uploader.destroy(publicId, { resource_type: "image" });
    return;
  }

  try {
    const url = new URL(imageUrl);
    const uploadsMarker = "/uploads/";
    const markerIndex = url.pathname.lastIndexOf(uploadsMarker);
    if (markerIndex === -1) return;

    const filename = path.basename(decodeURIComponent(url.pathname.slice(markerIndex + uploadsMarker.length)));
    if (!filename) return;

    const uploadsDir = path.resolve(getUploadsDir());
    const filePath = path.resolve(uploadsDir, filename);
    if (!filePath.startsWith(`${uploadsDir}${path.sep}`)) return;

    await fs.rm(filePath, { force: true });
  } catch (error) {
    if (error.code !== "ENOENT" && error.code !== "ERR_INVALID_URL") {
      throw error;
    }
  }
};