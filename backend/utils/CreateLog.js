const { LogModel } = require("../models/LogModel");
const { getIO } = require("../controllers/SocketManager");
const createLog = async (userId, action, taskId) => {
  const newLog = await LogModel.create({
    user: userId,
    action,
    task: taskId,
  });
  const populatedLog = await LogModel.findById(newLog._id)
    .populate("task")
    .populate("user", "username email");
  getIO().emit("logCreated", populatedLog);
};

module.exports = { createLog };
