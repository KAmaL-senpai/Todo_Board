import io from "socket.io-client";

const socket = io(`${import.meta.env.BACKEND_API_BASE_URL}`, {
  withCredentials: true,
});

export default socket;
