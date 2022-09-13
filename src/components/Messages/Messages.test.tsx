import { render, screen } from "../../test-utils/render/customRender";
import Messages from "./Messages";
import userEvent from "@testing-library/user-event";
import mockContact from "../../test-utils/mocks/mockContact";

const mockSocketEmit = jest.fn();

jest.mock("../../sockets", () => ({
  open: () => undefined,
  on: (to: string, message: string) => jest.fn(),
  emit: () => mockSocketEmit,
}));

jest.mock("./openListener", () => () => jest.fn());

describe("Given a Messages component", () => {
  const setClose = jest.fn() as React.Dispatch<React.SetStateAction<boolean>>;

  describe("When instantiated", () => {
    test("Then there should be a form to send messages and a history of messages", () => {
      render(<Messages friend={mockContact} close={setClose} />);

      const messages = [
        screen.getByRole("textbox"),
        screen.getByRole("button", { name: "Send" }),
      ];

      messages.forEach((element) => expect(element).toBeInTheDocument());
    });
  });

  describe("When instantiated and submitted the send form", () => {
    test("Then it should change the input value and show the message in the history", async () => {
      render(<Messages friend={mockContact} close={setClose} />);

      const typedMessage = "hello";

      const messenger = screen.getByRole("textbox");
      const submitButton = screen.getByRole("button", { name: "Send" });

      await userEvent.type(messenger, typedMessage);

      expect(messenger).toHaveValue(typedMessage);

      await userEvent.click(submitButton);

      const message = screen.getByText(typedMessage);
      expect(message).toBeInTheDocument();
    });

    test("Then it should do nothing if the message was empty", async () => {
      render(<Messages friend={mockContact} close={setClose} />);

      const submitButton = screen.getByRole("button", { name: "Send" });

      await userEvent.click(submitButton);

      expect(mockSocketEmit).not.toHaveBeenCalled();
    });
  });

  describe("When instantiated and clicked the close modal button", () => {
    test("Then it should call the close state setter", async () => {
      render(<Messages friend={mockContact} close={setClose} />);

      const modalArea = screen.getByTestId("modal-close");

      await userEvent.click(modalArea);

      expect(setClose).toHaveBeenCalledWith(false);
    });
  });
});
