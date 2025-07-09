require("@dotenvx/dotenvx").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const http = require("http");
const { init } = require("./controllers/SocketManager");

// Routers
const UserRouter = require("./routes/UserRoutes");
const TaskRouter = require("./routes/TaskRoutes");
const LogRouter = require("./routes/LogRoutes");

const app = express();
const server = http.createServer(app);
const io = init(server);

// ─────────────────────────────
// 📡 Socket.IO Setup
// ─────────────────────────────
io.on("connection", (socket) => {
  console.log("🟢 A user connected");

  socket.on("taskUpdated", (data) => {
    socket.broadcast.emit("taskUpdated", data);
  });

  socket.on("reassignTask", (updatedTask) => {
    socket.broadcast.emit("taskReassigned", updatedTask);
  });

  socket.on("disconnect", () => {
    console.log("🔴 A user disconnected");
  });
});

// ─────────────────────────────
// 🌐 Middlewares
// ─────────────────────────────
app.use(
  cors({
    origin: ["https://todo-board-phi.vercel.app"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─────────────────────────────
// 🚏 Routes
// ─────────────────────────────
app.use("/api/v1/users", UserRouter);
app.use("/api/v1/tasks", TaskRouter);
app.use("/api/v1/logs", LogRouter);

// ─────────────────────────────
// ❌ Global Error Handler
// ─────────────────────────────
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Something went wrong",
  });
});

// ─────────────────────────────
// 🚀 Server + DB Init
// ─────────────────────────────
const PORT = process.env.PORT || 8080;

server.listen(PORT, async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("✅ Connected to MongoDB");
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  } catch (err) {
    console.error("❌ DB Connection Error:", err);
  }
});
