import React from "react";
import { Messages } from "../Messages/Messages";
import { EnterChat } from "../EnterChat/EnterChat";
import { AddMessage } from "../AddMessage/AddMessage";
import { CurrentUsers } from "../CurrentUsers/CurrentUsers";
import io from "socket.io-client";
import axios from "axios";
import "./Chat.css";

export class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      message: "",
      messages: [],
      user: "",
      users: []
    };

    this.socket = io("localhost:8080");

    this.socket.on("RECEIVE_MESSAGE", msgObj => {
      this.receiveMessage(msgObj);
    });

    this.socket.on("NEW_USER_JOINED", userObj => {
      this.newUserJoined(userObj);
    });

    this.socket.on("USER_DROPPED", updatedUserStore => {
      this.userDropped(updatedUserStore);
    });
  }

  handleBeforeUnload = () => {
    this.socket.emit("DROP_USER", {
      user: this.state.user
    });
  };

  componentWillMount() {
    window.addEventListener("beforeunload", this.handleBeforeUnload);
  }

  componentWillUnmount() {
    window.removeEventListener("beforeunload", this.handleBeforeUnload);
  }

  getInitialUsersInChat = () => {
    axios.get("/users").then(res => {
        this.setState({ users: res.data });
      })
      .catch(error => {
        console.log("error", error);
      });
  };

  getInitialMsgsInChat = () => {
    axios.get("/messages").then(res => {
      this.setState({ messages: res.data });
    });
  };

  userDropped = updatedUserStore => {
    this.setState({ users: updatedUserStore });
  };

  newUserJoined = userObj => {
    this.setState({ users: [...this.state.users, userObj] });
    this.getInitialUsersInChat();
    this.getInitialMsgsInChat();
  };

  receiveMessage = msgObj => {
    this.setState({ messages: [...this.state.messages, msgObj] });
  };

  postMessage = message => {
    axios.post("/add-new-message", {
        author: this.state.user,
        message
      })
      .then(res => {
        this.setState({ message: res.data.message });
      })
      .catch(error => {
        console.log("error", error);
      });
  };

  sendMessage = message => {
    this.socket.emit("SEND_MESSAGE", {
      author: this.state.user,
      message
    });
    this.postMessage(message);
    this.setState({ message: "" });
  };

  postUser = user => {
    axios.post("/add-new-user", {
        user
      })
      .then(res => {
        this.setState({ user: res.data.user });
      })
      .catch(error => {
        console.log("error:", error);
      });
  };

  enterChat = user => {
    this.socket.emit("ADD_NEW_USER", {
      user
    });
    this.postUser(user);
  };

  render() {
    const { messages, user, users } = this.state;

    if (!user) {
      return <EnterChat enterChat={this.enterChat} />;
    }

    return (
      <div className="Chat--container">
        <div className="Chat--header">Hello, {user}</div>
        <div className="Chat--body">
          <div className="Chat--current-users">
            <CurrentUsers currentUser={user} allUsers={users} />
          </div>
          <div className="Chat--messages">
            <Messages currentUser={user} messages={messages} />
            <AddMessage sendMessage={this.sendMessage} />
          </div>
        </div>
      </div>
    );
  }
}
