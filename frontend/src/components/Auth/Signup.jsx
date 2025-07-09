import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
function Signup() {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/v1/users/signup", formData, {
        withCredentials: true,
      });
      navigate("/home");
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <>
      <Link to={"/"} className="backIcon">
        {"<"}{" "}
      </Link>
      <div className="auth">
        <div className="auth-box">
          <h1>TodoBoard</h1>
          <p>Signup to continue</p>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email">Email</label>
              <br />

              <input type="email" name="email" onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="username">Username</label>
              <br />
              <input type="text" name="username" onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <br />
              <input type="password" name="password" onChange={handleChange} />
            </div>
            <button type="submit">Submit</button>
          </form>
          <p>
            If already have an account?{" "}
            <Link
              to={"/login"}
              style={{ textDecoration: "none", color: "white" }}
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Signup;
