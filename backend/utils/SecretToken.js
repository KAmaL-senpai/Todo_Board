require("@dotenvx/dotenvx").config();
const jwt = require("jsonwebtoken");

module.exports.createJWT_SECRETToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};
