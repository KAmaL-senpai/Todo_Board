import emailTodos from "/email-todos.webp";
import slackteams from "/slackteams-to-inbox.webp";
function Message() {
  return (
    <div className="message">
      <div className="message-container">
        <div className="msg-head">
          <h1>From message to action</h1>
          <p>
            Quickly turn communication from your favorite apps into to-dos,
            keeping all <br /> your discussions and tasks organized in one
            place.
          </p>
        </div>
        <div className="emailTodos">
          <div className="email-image">
            <img src={emailTodos} alt="emailTodos_image" />
          </div>
          <div className="email-text">
            <h3>Email magic</h3>
            <p>
              Easily turn your emails into to-dos! Just forward them to your
              Trello Inbox, and they’ll be transformed by Atlassian Intelligence
              (AI) into organized to-dos with all the links you need.
            </p>
          </div>
        </div>
        <div className="slackTeam">
          <div className="slack-text">
            <h3>MESSAGE APP SORCERY</h3>
            <p>
              Need to follow up on a message from Slack or Microsoft Teams? Send
              it directly to your Trello board! Your favorite app interface lets
              you save messages that appear in your Trello Inbox with
              AI-generated summaries and links.
            </p>
          </div>
          <div className="slack-image">
            <img src={slackteams} alt="slackteams_image" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Message;
