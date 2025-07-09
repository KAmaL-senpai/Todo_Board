const { TaskModel } = require("../models/TaskModel");
const { wrapAsync } = require("../utils/WrapAsync");
const { getIO } = require("./SocketManager");
const { createLog } = require("../utils/CreateLog");

// Utility Constants
const forbiddenTitles = ["todo", "inprogress", "done"];

// ─────────────────────────────
// 📌 Create Task
// ─────────────────────────────
module.exports.createTask = wrapAsync(async (req, res) => {
  const { title, boardId } = req.body;
  const normalizedTitle = title.trim().toLowerCase();

  // Validation: Title should not match column names
  if (forbiddenTitles.includes(normalizedTitle)) {
    return res.status(400).json({
      message: "Task title cannot match column names (Todo, InProgress, Done).",
    });
  }

  // Validation: Unique title per board
  const existingTask = await TaskModel.findOne({
    boardId,
    title: { $regex: new RegExp(`^${title}$`, "i") },
  });

  if (existingTask) {
    return res
      .status(400)
      .json({ message: "Task title must be unique in the board." });
  }

  // Create Task
  const newTask = new TaskModel({
    ...req.body,
    assignUser: req.body.assignUser || req.user._id,
    createdBy: req.user._id,
  });

  await newTask.save();
  const populatedTask = await newTask.populate("assignUser");

  getIO().emit("taskCreated", populatedTask);
  await createLog(req.user._id, "Created Task", newTask._id);
  res.json(populatedTask);
});

// ─────────────────────────────
// 📌 Get All Tasks for Current User
// ─────────────────────────────
module.exports.allTask = wrapAsync(async (req, res) => {
  const allTask = await TaskModel.find({
    $or: [{ assignUser: req.user._id }, { createdBy: req.user._id }],
  }).populate("assignUser");

  res.json(allTask);
});

// ─────────────────────────────
// 📌 Get Task By ID (if user has access)
// ─────────────────────────────
module.exports.getTaskById = wrapAsync(async (req, res) => {
  const { id } = req.params;

  const task = await TaskModel.findOne({
    _id: id,
    $or: [{ assignUser: req.user._id }, { createdBy: req.user._id }],
  });

  if (!task) {
    return res.status(404).json({ message: "Task not found or unauthorized" });
  }

  res.json(task);
});

// ─────────────────────────────
// 📌 Update Task with Conflict Handling & Validation
// ─────────────────────────────
module.exports.updateTask = wrapAsync(async (req, res) => {
  const { id } = req.params;
  const { updatedAt: clientUpdatedAt, title, boardId } = req.body;

  const task = await TaskModel.findOne({
    _id: id,
    $or: [{ assignUser: req.user._id }, { createdBy: req.user._id }],
  });

  if (!task) {
    return res.status(403).json({ message: "Unauthorized or task not found" });
  }

  // Conflict detection
  const serverUpdatedAt = new Date(task.updatedAt).getTime();
  const clientTime = new Date(clientUpdatedAt).getTime();
  const timeDifference = Math.abs(clientTime - serverUpdatedAt);

  if (timeDifference > 100) {
    return res.status(409).json({
      message: "Task has been modified by someone else.",
      serverTask: task,
    });
  }

  const normalizedTitle = title?.trim().toLowerCase();

  // Validation: Prevent column name titles
  if (normalizedTitle && forbiddenTitles.includes(normalizedTitle)) {
    return res.status(400).json({
      message: "Task title cannot match column names (Todo, InProgress, Done).",
    });
  }

  // Validation: Unique title (if changing)
  if (normalizedTitle && title !== task.title) {
    const existingTask = await TaskModel.findOne({
      boardId,
      title: { $regex: new RegExp(`^${title}$`, "i") },
      _id: { $ne: id },
    });

    if (existingTask) {
      return res.status(400).json({
        message: "Task title must be unique within the board.",
      });
    }
  }

  // Update task
  const updatedTask = await TaskModel.findByIdAndUpdate(
    id,
    { ...req.body, updatedAt: new Date() },
    { new: true }
  ).populate("assignUser");

  getIO().emit("taskUpdated", updatedTask);
  getIO().emit("taskReassigned", updatedTask);
  await createLog(req.user._id, "Updated Task", updatedTask._id);
  res.json(updatedTask);
});

// ─────────────────────────────
// 📌 Delete Task (Only by assignUser or creator)
// ─────────────────────────────
module.exports.deleteTask = wrapAsync(async (req, res) => {
  const deleteTask = await TaskModel.findOneAndDelete({
    _id: req.params.id,
    $or: [{ assignUser: req.user._id }, { createdBy: req.user._id }],
  });

  if (!deleteTask) {
    return res.status(404).json({ message: "Task not found or unauthorized" });
  }

  getIO().emit("taskDeleted", deleteTask._id);
  await createLog(req.user._id, "Deleted Task", deleteTask._id);
  res.json({ message: "Task Deleted" });
});
