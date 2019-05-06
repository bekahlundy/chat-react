import React, { Component } from "react";
import "./AddMessage.css";

export class AddMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ""
    };
  }

  handleKeyUp = ev => {
    if (ev.keyCode === 13) {
      this.handleClick();
    }
  };

  handleClick = () => {
    if (this.state.message) {
      this.props.sendMessage(this.state.message);
      this.setState({ message: "" });
    }
  };

  render() {
    const { message } = this.state;

    return (
      <div className="AddMessage--container">
        <input
          type="text"
          data-testid="add-message-input"
          placeholder="Message"
          className="AddMessage--input"
          value={message}
          onChange={ev => this.setState({ message: ev.target.value })}
          onKeyUp={this.handleKeyUp}
        />
        <button
          data-testid="add-message-button"
          onClick={this.handleClick}
          className="AddMessage--btn"
        >
          Send
        </button>
      </div>
    );
  }
}
