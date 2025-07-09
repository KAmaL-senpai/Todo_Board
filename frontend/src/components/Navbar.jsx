import { Link } from "react-router-dom";
function Navbar() {
  return (
    
      <nav>
        <div className="logo">TodoBoard</div>
        <div className="menu">
          <Link to={"/signup"}>Signup</Link>
          <Link to={"/login"}>Login</Link>
        </div>
      </nav>
    
  );
}

export default Navbar;
