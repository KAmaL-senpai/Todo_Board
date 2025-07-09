const { Schema } = require("mongoose");

const TaskSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  assignUser: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  status: {
    type: String,
    enum: ["Todo", "inProgress", "Done"],
    default: "Todo",
  },
  priority: {
    type: String,
    enum: ["Low", "High", "medium"],
    default: "medium",
  },
  updateAt: {
    type: Date,
    default: Date.now,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
});

module.exports = { TaskSchema };
