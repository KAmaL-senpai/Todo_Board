import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/v1/users/login", formData, {
        withCredentials: true,
      });
      navigate("/home");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <>
      <Link to={"/"} className="backIcon">
        {"<"}
      </Link>
      <div className="auth">
        <div className="auth-box">
          <h1>TodoBoard</h1>
          <p>Login to continue</p>
          <form onSubmit={handleSubmit} style={{ marginBottom: "3rem" }}>
            <div>
              <label htmlFor="email">Email</label>
              <br />

              <input type="email" name="email" onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <br />
              <input type="password" name="password" onChange={handleChange} />
            </div>
            <button type="submit">Submit</button>
          </form>
          <p>
            Create an account?{" "}
            <Link
              to={"/signup"}
              style={{ textDecoration: "none", color: "white" }}
            >
              Signup
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
