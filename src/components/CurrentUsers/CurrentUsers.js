import React, { Component } from "react";
import "./CurrentUsers.css"
export class CurrentUsers extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { currentUser, allUsers } = this.props;

    if (allUsers.length === 0 || !currentUser) {
      return <div className="CurrentUsers">something went wrong, try again</div>;
    }

    return (
      <div className="CurrentUsers--container">
        <div className="CurrentUsers--title">Current Users:</div>
        {allUsers.map(user => (
          <div key={user.id} className={ currentUser === user.user ? "CurrentUsers--current-user" : "CurrentUsers--user"}>{user.user}</div>
        ))}
      </div>
    );
  }
}
