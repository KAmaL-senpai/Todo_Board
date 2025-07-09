const { LogModel } = require("../models/LogModel");

const { wrapAsync } = require("../utils/WrapAsync");

module.exports.getLogs = wrapAsync(async (req, res) => {
  const logs = await LogModel.find()
    .sort({ timestamp: -1 })
    .limit(20)
    .populate("task")
    .populate("user", "username email");

  res.json(logs);
});
