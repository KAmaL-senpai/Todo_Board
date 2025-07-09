const { Schema } = require("mongoose");

const LogSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  action: {
    type: String,
  },
  task: {
    type: Schema.Types.ObjectId,
    ref: "task",
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = { LogSchema };
