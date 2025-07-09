const { UserModel } = require("../models/UserModel");
const { createSecretToken } = require("../utils/SecretToken");
const bcrypt = require("bcryptjs");
const { wrapAsync } = require("../utils/WrapAsync");
const { StatusCodes } = require("http-status-codes");

// ─────────────────────────────
// 📌 Signup
// ─────────────────────────────
module.exports.Signup = wrapAsync(async (req, res) => {
  const { email, username, password } = req.body;

  // Check if user already exists
  const existingUser = await UserModel.findOne({ email });
  if (existingUser) {
    return res
      .status(StatusCodes.CONFLICT)
      .json({ message: "User already registered" });
  }

  // Create user
  const user = await UserModel.create({ email, username, password });

  // Generate token
  const token = createSecretToken(user._id);

  // Set cookie
  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
  });

  res.status(StatusCodes.CREATED).json({
    message: "User signed up successfully",
    success: true,
    user,
  });
});

// ─────────────────────────────
// 📌 Login
// ─────────────────────────────
module.exports.Login = wrapAsync(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(StatusCodes.FORBIDDEN)
      .json({ message: "All fields are required" });
  }

  // Find user by email
  const user = await UserModel.findOne({ email });
  if (!user) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Incorrect email or password" });
  }

  // Compare password
  const auth = await bcrypt.compare(password, user.password);
  if (!auth) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Incorrect email or password" });
  }

  // Create token
  const token = createSecretToken(user._id);

  // Set cookie
  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "Lax",
    secure: process.env.NODE_ENV === "production",
  });

  res.status(StatusCodes.OK).json({
    message: "User logged in successfully",
    success: true,
    user,
  });
});

// ─────────────────────────────
// 📌 Get Current Logged-in User
// ─────────────────────────────
module.exports.getCurrentUser = wrapAsync(async (req, res) => {
  const user = await UserModel.findById(req.user._id).select(
    "username email _id"
  );
  if (!user) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: "User not found" });
  }

  res.status(StatusCodes.OK).json(user);
});

// ─────────────────────────────
// 📌 Get All Users (For Admin / Team Listing)
// ─────────────────────────────
module.exports.getAllUsers = wrapAsync(async (req, res) => {
  const users = await UserModel.find({}, "username email _id");
  res.status(StatusCodes.OK).json(users);
});

// ─────────────────────────────
// 📌 Logout
// ─────────────────────────────
module.exports.Logout = wrapAsync(async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "None",
    secure: true,
  });

  res.status(StatusCodes.OK).json({ message: "Logged out successfully" });
});
