import { useEffect, useState } from "react";
import axios from "axios";
import { DragDropContext } from "@hello-pangea/dnd";
import socket from "./hooks/socket";
import KanbanColumn from "./KanbanColumn";
import LogsTable from "./LogsTable";
import Sidebar from "./Sidebar";
import useSocketTaskReassign from "./hooks/useSocketTaskReassign";

const statusCategories = ["Todo", "inProgress", "Done"];

function KanbanBoard() {
  const [tasks, setTasks] = useState([]);
  const [logs, setLogs] = useState([]);
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [flippedTaskIds, setFlippedTaskIds] = useState([]);

  // Fetch tasks
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/api/v1/tasks/allTask",
          {
            withCredentials: true,
          }
        );
        setTasks(res.data);
      } catch (err) {
        console.error("Error fetching tasks:", err);
      }
    };
    fetchTasks();
  }, []);

  // Fetch logs
  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/v1/logs", {
          withCredentials: true,
        });
        setLogs(res.data);
      } catch (err) {
        console.error("Error fetching logs:", err);
      }
    };
    fetchLogs();

    socket.on("newLog", (newLog) => {
      setLogs((prevLogs) => [newLog, ...prevLogs.slice(0, 19)]);
    });

    return () => socket.off("newLog");
  }, []);

  // Fetch users for assignment
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/v1/users", {
          withCredentials: true,
        });
        setUsers(res.data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    fetchUsers();
  }, []);
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/v1/users/me", {
          withCredentials: true,
        });
        setCurrentUser(res.data);
      } catch (err) {
        console.error("Failed to fetch current user:", err);
      }
    };
    fetchCurrentUser();
  }, []);
  useSocketTaskReassign(currentUser, setTasks, setFlippedTaskIds);

  const onDragEnd = async (result) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;

    const taskId = draggableId;
    const newStatus = destination.droppableId;

    const updatedTasks = tasks.map((task) =>
      task._id === taskId ? { ...task, status: newStatus } : task
    );

    setTasks(updatedTasks);

    try {
      const movedTask = updatedTasks.find((t) => t._id === taskId);
      await axios.put(
        `http://localhost:8080/api/v1/tasks/update/${taskId}`,
        {
          ...movedTask,
          updatedAt: new Date().toISOString(),
        },
        { withCredentials: true }
      );
    } catch (err) {
      console.error("Failed to update task status:", err);
    }
  };

  const getTasksByStatus = (status) => {
    if (!currentUser) return [];
    return tasks.filter(
      (task) =>
        task.status === status &&
        task.assignUser &&
        task.assignUser._id === currentUser._id
    );
  };
  return (
    <div className="dash-wrapper">
      <div className="dash-container">
        <Sidebar />

        <div style={{ width: "100%", overflowX: "auto" }}>
          <div className="kanban-board">
            <DragDropContext onDragEnd={onDragEnd}>
              {statusCategories.map((status) => (
                <KanbanColumn
                  key={status}
                  status={status}
                  tasks={getTasksByStatus(status)}
                  users={users}
                  currentUser={currentUser}
                  flippedTaskIds={flippedTaskIds}
                  setTasks={setTasks}
                  setFlippedTaskIds={setFlippedTaskIds}
                  allTasks={tasks}
                />
              ))}
            </DragDropContext>
          </div>
          <hr />
        </div>
      </div>

      <h3 style={{ textAlign: "center", color: "white", fontSize: "1.3rem" }}>
        Recent Logs
      </h3>
      <div className="container logs-table-wrapper">
        <LogsTable logs={logs} />
      </div>
    </div>
  );
}

export default KanbanBoard;
