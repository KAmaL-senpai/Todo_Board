import { useState, useEffect } from "react";
import axios from "axios";
import DashNav from "../Dashboard/DashNav";
import { Link, useParams, useNavigate } from "react-router-dom";

function Edit() {
  const { id } = useParams(); // Get task ID from URL
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "Todo",
    priority: "medium",
  });

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/v1/tasks/${id}`,
          {
            withCredentials: true,
          }
        );
        setFormData({
          title: res.data.title,
          description: res.data.description,
          status: res.data.status,
          priority: res.data.priority,
        });
      } catch (err) {
        console.error("Failed to load task", err);
      }
    };

    fetchTask();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:8080/api/v1/tasks/update/${id}`,
        formData,
        {
          withCredentials: true,
        }
      );
      navigate("/updateTask");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Error updating task");
    }
  };

  return (
    <>
      <DashNav />
      <Link to={"/updatetask"} className="backIcon">
        {"<"}
      </Link>
      <div className="container">
        <form onSubmit={handleSubmit} className="formData">
          <h1>Edit Task</h1>

          <div className="form-input">
            <label>Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-input">
            <label>Description</label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-input">
            <label>Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="Todo">Todo</option>
              <option value="inProgress">In Progress</option>
              <option value="Done">Done</option>
            </select>
          </div>

          <div className="form-input">
            <label>Priority</label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
            >
              <option value="Low">Low</option>
              <option value="medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <button type="submit" className="form-btn">
            Edit
          </button>
        </form>
      </div>
    </>
  );
}

export default Edit;
