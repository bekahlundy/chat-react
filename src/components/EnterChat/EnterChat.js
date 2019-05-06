import React, { Component } from "react";
import "./EnterChat.css";

export class EnterChat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: ""
    };
  }

  handleClick = () => {
    if (this.state.user) {
      this.props.enterChat(this.state.user);
    }
  };

  handleKeyUp = e => {
    if (e.keyCode === 13) {
      this.handleClick();
    }
  };

  render() {
    const { user } = this.state;
    return (
      <div className="EnterChat--container">
        <div className="EnterChat--welcome-title">
          Welcome to the chat. Enter your name to join
        </div>
        <div className="EnterChat--input-container">
          <input
            className="EnterChat--input"
            data-testid="enter-chat-input"
            type="text"
            placeholder="Enter name here"
            value={user}
            onChange={event => this.setState({ user: event.target.value })}
            onKeyUp={this.handleKeyUp}
          />
          <button
            data-testid="enter-chat-button"
            onClick={this.handleClick}
            className="EnterChat--btn"
          >
            Enter Chat
          </button>
        </div>
      </div>
    );
  }
}
