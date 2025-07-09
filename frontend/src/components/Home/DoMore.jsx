function DoMore() {
  return (
    <div className="domore">
      <div className="domore-head">
        <h1>Do more with TodoBoard</h1>
        <p>
          Customize the way you organize with easy integrations, <br />
          automation, and mirroring of your to-dos across multiple <br />{" "}
          locations.
        </p>
      </div>
      <div className="domore-cards">
        <div className=" card card-1">
          <h3>Integrations</h3>
          <p>
            Connect the apps you are already using into your Trello workflow or
            add a Power-Up to fine-tune your specific needs.
          </p>
          <button>Broswer Integrations</button>
        </div>
        <div className=" card card-2">
          <h3>Butler Automation</h3>
          <p>
            No-code automation is built into every Trello board. Focus on the
            work that matters most and let the robots do the rest.
          </p>
          <button>Get to know Automation</button>
        </div>
        <div className=" card card-3">
          <h3>Card mirroring</h3>
          <p>
            View all your to-dos from multiple boards in one place. Mirror a
            card to keep track of work wherever you need it!
          </p>
          <button>Compare plans</button>
        </div>
      </div>
    </div>
  );
}

export default DoMore;
