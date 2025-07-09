const { UserModel } = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const { wrapAsync } = require("./WrapAsync");
require("@dotenvx/dotenvx").config();

// Utility: Verify JWT Token with a Promise
function verifyToken(token, secret) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) reject(err);
      else resolve(decoded);
    });
  });
}

// ─────────────────────────────
// 📌 Auth Middleware
// ─────────────────────────────
module.exports.verifyUser = wrapAsync(async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      status: false,
      message: "Unauthorized: No token provided",
    });
  }

  try {
    // Decode and verify token
    const decoded = await verifyToken(token, process.env.SECRET);

    // Find the user from decoded token
    const user = await UserModel.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User not found",
      });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({
      status: false,
      message: "Invalid or expired token",
    });
  }
});
