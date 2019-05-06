import React from "react";
import ReactDOM from "react-dom";
import { Messages } from "./Messages";
import { render, cleanup } from "react-testing-library";

describe("Messages", () => {

  afterEach(() => {
    cleanup();
  });

  it("renders no messages text when there are no messages", () => {
    const user = "Bekah";
    const messages = [];
    const { container } = render(<Messages currentUser={user} messages={messages} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders with messages", () => {
    const user = "Bekah";
    const messages = [
      {author: "bekah", message: "Hello"},
      {author: "A dog", message: "woof"}
    ]
    const { container } = render(<Messages currentUser={user} messages={messages} />);

    expect(container.firstChild).toMatchSnapshot();
  });

});
