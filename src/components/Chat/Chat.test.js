import React from "react";
import ReactDOM from "react-dom";
import { Chat } from "./Chat";
import { render, cleanup } from "react-testing-library";
import uuid from "uuid";

describe("Chat", () => {

  afterEach(() => {
    cleanup();
  });

  it("renders enter chat component when there is no user", () => {
    const { container } = render(<Chat />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders multiple components when there is a user", async () => {
    // I would like to mock out axios calls here to get a user
  });
});
