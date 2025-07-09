const router = require("express").Router();
const {
  createTask,
  allTask,
  updateTask,
  deleteTask,
  getTaskById,
} = require("../controllers/TaskController");
const { verifyUser } = require("../utils/AuthMiddleware");

router.post("/createTask", verifyUser, createTask);
router.get("/allTask", verifyUser, allTask);
router.get("/:id", verifyUser, getTaskById);
router.put("/update/:id", verifyUser, updateTask);
router.delete("/delete/:id", verifyUser, deleteTask);

module.exports = router;
