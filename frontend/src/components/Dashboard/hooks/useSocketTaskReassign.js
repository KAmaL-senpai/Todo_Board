import { useEffect } from "react";
import socket from "./socket";

export default function useSocketTaskReassign(
  currentUser,
  setTasks,
  setFlippedTaskIds
) {
  useEffect(() => {
    if (!currentUser || !currentUser._id) return;

    const handleTaskReassigned = (updatedTask) => {
      if (
        updatedTask.assignUser._id === currentUser._id ||
        updatedTask.createdBy === currentUser._id
      ) {
        setTasks((prevTasks) => {
          const exists = prevTasks.find((t) => t._id === updatedTask._id);
          setFlippedTaskIds((ids) => [...ids, updatedTask._id]);
          setTimeout(() => {
            setFlippedTaskIds((ids) =>
              ids.filter((id) => id !== updatedTask._id)
            );
          }, 600);
          return exists
            ? prevTasks.map((t) =>
                t._id === updatedTask._id ? updatedTask : t
              )
            : [...prevTasks, updatedTask];
        });
      } else {
        setTasks((prevTasks) =>
          prevTasks.filter((t) => t._id !== updatedTask._id)
        );
      }
    };

    socket.on("taskReassigned", handleTaskReassigned);
    return () => socket.off("taskReassigned", handleTaskReassigned);
  }, [currentUser, setTasks, setFlippedTaskIds]);
}
