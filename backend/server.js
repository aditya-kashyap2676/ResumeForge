import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./Config/db.js";
import dns from "dns"
import authRoutes from "./routes/authRoutes.js"
dns.setServers(["8.8.8.8", "8.8.4.4"]);
dotenv.config();

const app = express();

// Middleware to handle CORS
app.use(cors({
  origin: process.env.CLIENT_URL || "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

// Connect Database
connectDB();

// Middleware
app.use(express.json());

//Routes
app.use("/api/auth", authRoutes)
app.use("/api/resume",resumeRoutes)

// Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
