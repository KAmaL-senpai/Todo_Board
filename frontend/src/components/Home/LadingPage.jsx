import Footer from "../Footer";
import Navbar from "../Navbar";
import "../../App.css";
import { Link } from "react-router-dom";
import Productivity from "./Productivity";
import Message from "./Message";
import DoMore from "./DoMore";
import GetStarted from "./GetStarted";

function LandingPage() {
  return (
    <div className="page-wrapper">
      <Navbar />
      <div className="content">
        <div className="hero">
          <div className="hero-1">
            <h1>Capture, organize, and tackle your to-dos from anywhere.</h1>
            <p>
              Escape the clutter and chaos—unleash your productivity with
              TodoBoard.
            </p>
            <Link to={"/signup"} className="btn">
              Get Started
            </Link>
          </div>
          <div className="hero-2">
            <video src="/HeroVideo.mp4"></video>
          </div>
        </div>
        <Productivity />
        <Message />
        <DoMore />
        <GetStarted />
      </div>
      <Footer />
    </div>
  );
}

export default LandingPage;
