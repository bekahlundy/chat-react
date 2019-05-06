import React, { Component } from 'react';
import { Chat } from "../Chat/Chat";
import './App.css';

export default class App extends Component {
  render() {
    return (
      <div className="App">
          <Chat/>
      </div>
    );
  }
}
