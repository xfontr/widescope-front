import mockContact from "../../test-utils/mocks/mockContact";
import { render, screen } from "../../test-utils/render/customRender";
import Contacts from "./Contacts";

describe("Given a contacts component", () => {
  describe("When instantiated with a list of contacts", () => {
    test("Then it should display each contact main data", () => {
      render(<Contacts contacts={[mockContact]} />);

      const contacts = screen.getAllByRole("heading", {
        name: mockContact.name,
        level: 3,
      });

      contacts.forEach((contact) => expect(contact).toBeInTheDocument());
    });
  });

  describe("When instantiated with an empty list of contacts", () => {
    test("Then it should inform the user that no contacts were found", () => {
      render(<Contacts contacts={[]} />);

      const message = screen.getByText("You don't seem to have any contact :(");

      expect(message).toBeInTheDocument();
    });
  });
});
