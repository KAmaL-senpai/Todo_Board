const router = require("express").Router();
const { getLogs } = require("../controllers/LogController");
const { verifyUser } = require("../utils/AuthMiddleware");

router.get("/", verifyUser, getLogs);

module.exports = router;