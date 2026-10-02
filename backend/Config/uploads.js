import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const defaultUploadsDir = path.resolve(__dirname, "../uploads");

export const getUploadsDir = () =>
  path.resolve(process.env.UPLOADS_DIR || defaultUploadsDir);

export const ensureUploadsDir = () => {
  const uploadsDir = getUploadsDir();
  fs.mkdirSync(uploadsDir, { recursive: true });
  return uploadsDir;
};