import { useNavigate } from "react-router-dom";
import axios from "axios";

function DashNav({}) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        `${import.meta.env.BACKEND_API_BASE_URL}/api/v1/users/logout`
      );
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Logout failed");
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <h2 className="logo">TodoBoard</h2>
      </div>
      <div className="navbar-right">
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default DashNav;
