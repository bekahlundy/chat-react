import React from "react";
import ReactDOM from "react-dom";
import { Chat } from "./Chat";
import { render, cleanup } from "react-testing-library";
import uuid from "uuid";
import axiosMock from "axios";
import MockAdapter from 'axios-mock-adapter';

describe("Chat", () => {
  let axiosMock: MockAdapter;

  beforeEach(() => {
  axiosMock = new MockAdapter(axios);
  axiosMock.onPost(`/add-new-user`).reply(201, { name: 'Bekah', id: uuid.v4() });
});

  afterEach(() => {
    cleanup();
  });

  it("renders enter chat component when there is no user", () => {
    const { container } = render(<Chat />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders multiple components when there is a user", async () => {
    axiosMock.onGet(`/users`).reply(200, []);
    axiosMock.onGet(`/messages`).reply(200, []);

    const { container } = render(<Chat />);
    await enterChat(container);
    expect(container.firstChild).toMatchSnapshot();
  });
});
