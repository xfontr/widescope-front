import { allFormFields } from "../../configs/allFormFields";
import { render, screen } from "../../test-utils/render/customRender";
import ManageContacts from "./ContactsPage";

describe("Given a ManageContacts component", () => {
  describe("When instantiated", () => {
    test("Then there should be a heading and a search form", async () => {
      render(<ManageContacts />);

      const manageContacts = [
        screen.getByRole("heading", { name: "Meet other authors", level: 2 }),
        screen.getByLabelText(allFormFields.search.label),
        screen.getByRole("heading", { name: "Your friends", level: 3 }),
      ];

      manageContacts.forEach((element) => expect(element).toBeInTheDocument());
    });
  });
});
