import React from "react";
import ReactDOM from "react-dom";
import { CurrentUsers } from "./CurrentUsers";
import { render, cleanup } from "react-testing-library";
import uuid from "uuid";

describe("CurrentUsers", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders warning text if there is no current user", () => {
    const user = "";
    const users = [
      { user: "bekah", id: uuid.v4() },
      { user: "friend", id: uuid.v4() }
    ];

    const { container } = render(
      <CurrentUsers currentUser={user} allUsers={users} />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders warning text if there are no users", () => {
    const user = "bekah";
    const users = [];

    const { container } = render(
      <CurrentUsers currentUser={user} allUsers={users} />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders current users when there is both a user and a users array", () => {
    const user = "bekah";
    const users = [
      { user: "bekah", id: uuid.v4() },
      { user: "friend", id: uuid.v4() }
    ];

    const { container } = render(
      <CurrentUsers currentUser={user} allUsers={users} />
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
