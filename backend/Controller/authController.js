import { User } from "../Models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { deleteStoredImage, storeImage } from "../Config/imageStorage.js";

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

// @desc Register a new user
// @route POST /api/auth/register
// @access Public

const registerUser = async (req, res) => {
  try {
    const { name, email, password, profileImageUrl } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      profileImageUrl
    });

    // Generate token
    const token = generateToken(user._id);

    // Send response
    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profileImageUrl: user.profileImageUrl
      },
      token
    });

  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message
    });
  }
};

// @desc Login user
// @route POST /api/auth/login
// @access Public

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password"
      });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid email or password"
      });
    }

    // Generate token
    const token = generateToken(user._id);

    // Send response
    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profileImageUrl: user.profileImageUrl
      },
      token
    });

  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message
    });
  }
};

// @desc Get user Profile
// @route GET /api/auth/profile
// @access Private (Requires JWT)

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.status(200).json(user);

  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message
    });
  }
};

const updateProfileImage = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  let imageUrl;

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    imageUrl = await storeImage(req.file, {
      folder: "resumeforge/profile-images",
      baseUrl: `${req.protocol}://${req.get("host")}`,
    });

    const oldImageUrl = user.profileImageUrl;
    user.profileImageUrl = imageUrl;
    await user.save();

    if (oldImageUrl) {
      try {
        await deleteStoredImage(oldImageUrl);
      } catch (error) {
        console.error("Error deleting replaced profile image:", error);
      }
    }

    return res.status(200).json({ profileImageUrl: imageUrl });
  } catch (error) {
    if (imageUrl) {
      await deleteStoredImage(imageUrl).catch((cleanupError) => {
        console.error("Error cleaning up failed profile image:", cleanupError);
      });
    }

    return res.status(500).json({
      message: "Profile image update failed",
      error: error.message,
    });
  }
};

export {
  registerUser,
  loginUser,
  getUserProfile,
  updateProfileImage,
};