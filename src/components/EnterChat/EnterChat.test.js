import React from "react";
import ReactDOM from "react-dom";
import { EnterChat } from "./EnterChat";
import { render, fireEvent, wait, cleanup, getByTestId } from "react-testing-library";

describe("EnterChat", () => {

  afterEach(() => {
    cleanup();
  });

  it("renders", () => {
    const enterChatMock = jest.fn();
    const { container } = render(<EnterChat enterChat={enterChatMock} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  it("calls enterChat on submit(click) if given a user", async () => {
    const enterChatMock = jest.fn();
    const { container } = render(<EnterChat enterChat={enterChatMock} />);

    const input = getByTestId(container, "enter-chat-input");
    fireEvent.change(input, { target: { value: "Bekah"} } );

    const button = getByTestId(container, "enter-chat-button");
    fireEvent.click(button);

    await wait(() => {
      expect(enterChatMock).toHaveBeenCalledWith('Bekah');
    });
  });

  xit("calls enterChat on submit(enter) if given a user", async () => {
    const enterChatMock = jest.fn();
    const { container } = render(<EnterChat enterChat={enterChatMock} />);

    const input = getByTestId(container, "enter-chat-input");
    fireEvent.change(input, { target: { value: "Bekah"} } );
    fireEvent.keyUp(input, { key: 'Enter', code: 13, charCode: 13 });

    await wait(() => {
      expect(enterChatMock).toHaveBeenCalledWith('Bekah');
    });
  });

  it("does not call enterChat on submit(click) when not given a user", async () => {
    const enterChatMock = jest.fn();
    const { container } = render(<EnterChat enterChat={enterChatMock} />);

    const button = getByTestId(container, "enter-chat-button");
    fireEvent.click(button);

    await wait(() => {
      expect(enterChatMock).not.toHaveBeenCalled();
    });
  });

  xit("does not call enterChat on submit(enter) when not given a user", async () => {
    const enterChatMock = jest.fn();
    const { container } = render(<EnterChat enterChat={enterChatMock} />);

    const input = getByTestId(container, "enter-chat-input");
    fireEvent.keyUp(input, { key: 'Enter', code: 13, charCode: 13 });

    await wait(() => {
      expect(enterChatMock).not.toHaveBeenCalled();
    });
  });
});
