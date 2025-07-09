let io;

module.exports = {
  init: (server) => {
    io = require("socket.io")(server, {
      cors: {
        origin: ["http://localhost:5173"],
        credentials: true,
      },
    });
    return io;
  },
  getIO: () => {
    if (!io) throw new Error("Socket.io not Intialized!");
    return io;
  },
};
