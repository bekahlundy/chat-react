import React, { Component } from "react";
import "./Messages.css";

export class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { currentUser, messages } = this.props;

    if (messages.length === 0) {
      return <div className="Messages-container">no messages...</div>;
    }

    return (
      <div className="Messages--container">
        {messages.map(msg => {
          return (
            <div
              key={msg.message}
              className={
                currentUser === msg.author
                  ? "Messages-current-user-message-container"
                  : "Messages-message-container"
              }
            >
              <div className="Messages--author">
                {msg.author}:{" "}
                <div className="Messages--message">{msg.message}</div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
