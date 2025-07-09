import { useState } from "react";
import axios from "axios";
import DashNav from "../Dashboard/DashNav";
import { Link, useNavigate } from "react-router-dom";

function AddTask() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "Todo",
    priority: "medium",
  });
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/tasks/createTask",
        formData,
        {
          withCredentials: true,
        }
      );
      setFormData({
        title: "",
        description: "",
        status: "Todo",
        priority: "medium",
      });
      navigate("/home");
      // alert("Task Created")
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Error creating task");
    }
  };

  return (
    <>
      <DashNav />
      <Link to={"/home"} className="backIcon">
        {"<"}
      </Link>
      <div className="container">
        <form onSubmit={handleSubmit} className="formData">
          <h1>Add Task</h1>
          <div className="form-input">
            <label>Title</label>
            <br />
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
            <br />
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
            <br />
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
            <br />
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
            Create Task
          </button>
        </form>
      </div>
    </>
  );
}

export default AddTask;
