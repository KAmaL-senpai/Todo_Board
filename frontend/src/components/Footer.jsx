import { Link } from "react-router-dom";
function Footer() {
  return (
    <div className="footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-menu">
            <h1>Todo Board</h1>
            <Link
              to={"/login"}
              style={{ textDecoration: "none", color: "white" }}
            >
              Log in
            </Link>
          </div>
          <div className="footer-menu menu-hover">
            {" "}
            <h3>About TodoBoard</h3>
            <p>Whats behind the boards</p>
          </div>
          <div className="footer-menu menu-hover">
            <h3>Jobs</h3>
            <p>Learn on the open roles on the Trello Team</p>
          </div>
          <div className="footer-menu menu-hover">
            <h3>Apps</h3>
            <p>Download the Trello Apps for Dekstop or Mobile devices</p>
          </div>
          <div className="footer-menu menu-hover">
            <h3>Contact us</h3>
            <p>Need anything? Get in touch and we can help</p>
          </div>
        </div>
        <hr />
        <div className="footer-bottom">
          <div className="policies">
            <p>Privary Policy</p>
            <p>Terms</p>
            <p>&copy; Copyright 2025 TodoBoard </p>
          </div>
          <div className="socials">
            <p>
              <i className="fa-brands fa-instagram"></i>
            </p>
            <p>
              <i className="fa-brands fa-facebook-f"></i>
            </p>
            <p>
              <i className="fa-brands fa-linkedin-in"></i>
            </p>
            <p>
              <i className="fa-brands fa-twitter"></i>
            </p>
            <p>
              <i className="fa-brands fa-youtube"></i>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
