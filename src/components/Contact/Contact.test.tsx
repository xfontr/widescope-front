import mockContact from "../../test-utils/mocks/mockContact";
import { render, screen } from "../../test-utils/render/customRender";
import Contact from "./Contact";

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
});
