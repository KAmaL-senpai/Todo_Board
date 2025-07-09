const { model } = require("mongoose");
const { TaskSchema } = require("../schemas/TaskSchema");

const TaskModel = new model("task", TaskSchema);

module.exports = { TaskModel };
