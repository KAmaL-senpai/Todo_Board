// KanbanTask.jsx
import { Draggable } from "@hello-pangea/dnd";
import axios from "axios";
import socket from "./hooks/socket";

const KanbanTask = ({
  task,
  index,
  users,
  currentUser,
  flippedTaskIds,
  setTasks,
  setFlippedTaskIds,
  tasks,
}) => {
  const handleAssignChange = async (e) => {
    const newUserId = e.target.value;
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/tasks/update/${task._id}`,
        { assignUser: newUserId },
        { withCredentials: true }
      );
      socket.emit("reassignTask", res.data);
      setTasks((prev) => prev.map((t) => (t._id === task._id ? res.data : t)));
    } catch (err) {
      console.error("Failed to reassign task:", err);
    }
  };

  const handleSmartAssign = async () => {
    const activeCounts = {};
    tasks.forEach((t) => {
      if (
        ["Todo", "inProgress"].includes(t.status) &&
        t.assignUser &&
        typeof t.assignUser === "object"
      ) {
        const id = t.assignUser._id;
        activeCounts[id] = (activeCounts[id] || 0) + 1;
      }
    });

    const fewestUser = users
      .filter((u) => u._id !== currentUser?._id)
      .sort(
        (a, b) => (activeCounts[a._id] || 0) - (activeCounts[b._id] || 0)
      )[0];

    if (!fewestUser) return alert("No users available for smart assign.");

    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/tasks/update/${task._id}`,
        { assignUser: fewestUser._id },
        { withCredentials: true }
      );

      socket.emit("reassignTask", res.data);

      setTasks((prev) => prev.map((t) => (t._id === task._id ? res.data : t)));

      // Flip animation
      setFlippedTaskIds((ids) => [...ids, task._id]);
      setTimeout(() => {
        setFlippedTaskIds((ids) => ids.filter((id) => id !== task._id));
      }, 600);
    } catch (err) {
      console.error("Smart assign failed:", err);
    }
  };

  return (
    <Draggable draggableId={task._id} index={index}>
      {(provided) => (
        <div
          className={`kanban-task ${
            flippedTaskIds.includes(task._id) ? "flip" : ""
          }`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <h4>{task.title}</h4>
          <p>{task.description}</p>
          <small>Priority: {task.priority}</small>

          <div style={{ marginTop: "8px" }}>
            <label style={{ fontSize: "0.8rem" }}>Assign to:</label>
            <select
              value={task.assignUser ? task.assignUser._id : ""}
              onChange={handleAssignChange}
            >
              <option value="">Select User</option>
              {users
                .filter((user) => user._id !== currentUser?._id)
                .map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.username} ({user.email})
                  </option>
                ))}
            </select>
            <button
              onClick={handleSmartAssign}
              style={{
                marginTop: "5px",
                fontSize: "0.75rem",
                padding: "3px 6px",
                borderRadius: "4px",
                background: "#4caf50",
                color: "white",
                border: "none",
                cursor: "pointer",
              }}
            >
              Smart Assign
            </button>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default KanbanTask;
