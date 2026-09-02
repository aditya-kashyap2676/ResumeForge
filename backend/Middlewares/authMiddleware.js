import jwt from "jsonwebtoken";
import { User } from "../Models/User.js";
// Middleware to Protect Routes
const protect = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (token && token.startsWith("Bearer")) {
      // Extract Token
      token = token.split(" ")[1];
      // Verify Token
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
      );
      // Find User
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } else {
      res.status(401).json({
        message: "Not authorized, no token"
      });
    }
  } catch (error) {
    res.status(401).json({
      message: "Token failed",
      error: error.message
    });
  }
};
export default protect;