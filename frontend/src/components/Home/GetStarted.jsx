import { Link } from "react-router-dom";
function GetStarted() {
  return (
    <div className="getstarted">
      <h1>Get started with TodoBoard today</h1>
      <Link to={"/signup"} className="btn">
        Get Started
      </Link>
    </div>
  );
}

export default GetStarted;
