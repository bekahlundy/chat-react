import React from "react";
import ReactDOM from "react-dom";
import { AddMessage } from "./AddMessage";
import { render, cleanup, getByTestId, fireEvent, wait } from "react-testing-library";
import uuid from 'uuid';

describe("AddMessage", () => {

  afterEach(() => {
    cleanup();
  });

  it("renders", () => {
    const sendMessageMock = jest.fn();

    const { container } = render(<AddMessage sendMessage={sendMessageMock} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it("calls sendMessage on submit(click) if given a message", async () => {
    const sendMessageMock = jest.fn();
    const { container } = render(<AddMessage sendMessage={sendMessageMock} />);

    const input = getByTestId(container, "add-message-input");
    fireEvent.change(input, { target: { value: "Hello hello"} } );

    const button = getByTestId(container, "add-message-button");
    fireEvent.click(button);

    await wait(() => {
      expect(sendMessageMock).toHaveBeenCalledWith('Hello hello');
    });
  });

  xit("calls sendMessage on submit(enter) if given a message", async () => {
    const sendMessageMock = jest.fn();
    const { container } = render(<AddMessage sendMessage={sendMessageMock} />);

    const input = getByTestId(container, "add-message-input");
    fireEvent.change(input, { target: { value: "Hello hello"} } );
    fireEvent.keyUp(input, { key: 'Enter', code: 13, charCode: 13 });

    await wait(() => {
      expect(sendMessageMock).toHaveBeenCalledWith('Hello hello');
    });
  });

  it("does not call sendMessage on submit(click) when not given a message", async () => {
    const sendMessageMock = jest.fn();
    const { container } = render(<AddMessage sendMessage={sendMessageMock} />);

    const button = getByTestId(container, "add-message-button");
    fireEvent.click(button);

    await wait(() => {
      expect(sendMessageMock).not.toHaveBeenCalled();
    });
  });

  xit("does not call sendMessage on submit(enter) when not given a user", async () => {
    const sendMessageMock = jest.fn();
    const { container } = render(<AddMessage sendMessage={sendMessageMock} />);

    const input = getByTestId(container, "add-message-input");
    fireEvent.keyUp(input, { key: 'Enter', code: 13, charCode: 13 });

    await wait(() => {
      expect(sendMessageMock).not.toHaveBeenCalled();
    });
  });
});
