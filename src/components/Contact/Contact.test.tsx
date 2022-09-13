import mockContact from "../../test-utils/mocks/mockContact";
import { render, screen } from "../../test-utils/render/customRender";
import Contact from "./Contact";
import userEvent from "@testing-library/user-event";

jest.mock("../../sockets", () => ({
  open: () => undefined,
  on: (to: string, message: string) => jest.fn(),
  emit: () => jest.fn(),
}));

describe("Given a Contact component", () => {
  describe("When instantiated with a contact as props", () => {
    test("Then it should display the contact main data", () => {
      render(<Contact contact={mockContact} />);

      const contactName = screen.getByRole("heading", {
        name: mockContact.name,
        level: 3,
      });

      expect(contactName).toBeInTheDocument();
    });
  });

  describe("When instantiated and clicked the Talk button", () => {
    test("Then it should open a modal with the Messages component", async () => {
      render(<Contact contact={mockContact} />);

      const talk = screen.getByRole("button", { name: "Talk" });

      await userEvent.click(talk);

      const messages = screen.getByRole("textbox");

      expect(messages).toBeInTheDocument();
    });
  });
});
