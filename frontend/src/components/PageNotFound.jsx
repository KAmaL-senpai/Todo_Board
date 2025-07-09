import Footer from "./Footer";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <div className="page-wrapper">
      <Navbar />
      <div className="content">
        <div className="pageNotFound">
          <p>Page Not Found ;-)</p>
          <Link to="/" className="btn">
            Go Back
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default PageNotFound;
