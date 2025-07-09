import { useState } from "react";
import inboxSlider from "/inbox-slider.webp";
import boardSlider from "/board-slider.webp";
import plannerSlider from "/planner-slider.webp";

function Productivity() {
  const [selectedTab, setSelectedTab] = useState("todo");

  const getImage = () => {
    if (selectedTab === "todo") return inboxSlider;
    if (selectedTab === "board") return boardSlider;
    return plannerSlider;
  };

  return (
    <div className="product">
      <div className="product-head">
        <h1>Your productivity powerhouse</h1>
        <p>
          Stay organized and efficient with Inbox, Boards, and Planner. Every <br />
          to-do, idea, or responsibipty—no matter how small—finds its place, <br />
          keeping you at the top of your game.
        </p>
      </div>
      <div className="productivity">
        <div className="producvity-tab">
          <div
            className={`inbox box ${selectedTab === "todo" ? "active" : ""}`}
            onClick={() => setSelectedTab("todo")}
          >
            <h4>Inbox</h4>
            <p>
              When it’s on your mind, it goes in your inbox. Capture your to-dos
              from anywhere and anytime.
            </p>
          </div>

          <div
            className={`boards box ${selectedTab === "board" ? "active" : ""}`}
            onClick={() => setSelectedTab("board")}
          >
            <h4>Boards</h4>
            <p>
              Your to-do list may be long but it can be manageable! Keep tabs on
              everything from "todos to tackle" to "mission accomplished!"
            </p>
          </div>

          <div
            className={`planner box ${
              selectedTab === "planner" ? "active" : ""
            }`}
            onClick={() => setSelectedTab("planner")}
          >
            <h4>Planner</h4>
            <p>
              Drag, drop, get it done. Snap your top tasks into your calendar
              and make time for what truly matters.
            </p>
          </div>
        </div>

        <div className="productivity-slider">
          <img src={getImage()} alt="Productivity_Images" />
        </div>
      </div>
    </div>
  );
}

export default Productivity;
