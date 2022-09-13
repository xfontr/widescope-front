import mockUser from "../../test-utils/mocks/mockUser";
import { render, screen } from "../../test-utils/render/customRender";
import Messages from "./Messages";
import userEvent from "@testing-library/user-event";
import socket from "../../sockets";

jest.mock("../../sockets", () => ({
  open: () => undefined,
  on: (to: string, message: string) => jest.fn(),
  emit: () => jest.fn(),
}));

jest.mock("./openListener", () => () => jest.fn());

describe("Given a Messages component", () => {
  describe("When instantiated", () => {
    test("Then there should be a form to send messages and a history of messages", () => {
      render(<Messages friend={mockUser.name} />);

      const messages = [
        screen.getByRole("textbox"),
        screen.getByRole("button", { name: "Send" }),
      ];

      messages.forEach((element) => expect(element).toBeInTheDocument());
    });
  });

  describe("When instantiated and submitted the send form", () => {
    test("Then it should change the input value and show the message in the history", async () => {
      render(<Messages friend={mockUser.name} />);

      const typedMessage = "hello";

      const messenger = screen.getByRole("textbox");
      const submitButton = screen.getByRole("button", { name: "Send" });

      await userEvent.type(messenger, typedMessage);

      expect(messenger).toHaveValue(typedMessage);

      await userEvent.click(submitButton);

      const message = screen.getByText(`You: ${typedMessage}`);
      expect(message).toBeInTheDocument();
    });
  });
});
