import DashNav from "../Dashboard/DashNav";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
function AllTask() {
  const [taskes, setTaskes] = useState([]);
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.BACKEND_API_BASE_URL}/api/v1/tasks/allTask`,
          {
            withCredentials: true,
          }
        );
        setTaskes(res.data);
      } catch (err) {
        console.error("Failed to fetch tasks", err);
      }
    };

    fetchTasks();
  }, []);

  return (
    <>
      <DashNav />
      <Link to={"/home"} className="backIcon">
        {"<"}
      </Link>
      <div style={{ textAlign: "center" }} className="heading">
        All Task
      </div>
      <div className="container">
        {taskes.length === 0 ? (
          <p>No tasks found.</p>
        ) : (
          <table border="1" cellPadding="10">
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Status</th>
                <th>Priority</th>
              </tr>
            </thead>
            <tbody>
              {taskes.map((task) => (
                <tr key={task._id}>
                  <td>{task.title}</td>
                  <td>{task.description}</td>
                  <td>{task.status}</td>
                  <td>{task.priority}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

export default AllTask;
