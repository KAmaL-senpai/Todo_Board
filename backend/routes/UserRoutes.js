const router = require("express").Router();
const {
  Signup,
  Login,
  getAllUsers,
  Logout,
  getCurrentUser,
} = require("../controllers/UserController");
const { verifyUser } = require("../utils/AuthMiddleware");

router.post("/signup", Signup);
router.post("/login", Login);
router.get("/me", verifyUser, getCurrentUser);
router.get("/", verifyUser, getAllUsers);
router.post("/logout", Logout);

module.exports = router;
