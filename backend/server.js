
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./Config/db.js";
import dns from "dns";
import authRoutes from "./routes/authRoutes.js";
import resumeRoutes from "./routes/resumeRoutes.js";
import { getUploadsDir } from "./Config/uploads.js";
import { isCloudinaryConfigured } from "./Config/imageStorage.js";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

dotenv.config();

const app = express();
app.set("trust proxy", 1);

// Allowed Frontend Origins
const allowedOrigins = [
  "http://localhost:5173",
  "https://resumeforge-1-kpgu.onrender.com",
];

// Add CLIENT_URL from Render environment variables
if (process.env.CLIENT_URL) {
  allowedOrigins.push(
    ...process.env.CLIENT_URL.split(",").map((url) => url.trim().replace(/\/$/, ""))
  );
}

// CORS Configuration
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`CORS blocked for origin: ${origin}`));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Connect Database
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);

// Uploads folder
app.use(
  "/uploads",
  express.static(getUploadsDir(), {
    setHeaders: (res) => {
      res.set("Access-Control-Allow-Origin", "*");
    },
  })
);

// Server Start
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Image storage: ${isCloudinaryConfigured() ? "Cloudinary" : "local disk"}`);
  console.log("Allowed origins:", allowedOrigins);
});
