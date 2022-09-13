import { allFormFields } from "../../configs/allFormFields";
import { render, screen } from "../../test-utils/render/customRender";
import ManageContacts from "./ContactsPage";

describe("Given a ManageContacts component", () => {
  describe("When instantiated", () => {
    test("Then there should be a heading and a search form", async () => {
      render(<ManageContacts />);

      const manageContacts = [
        screen.getByRole("heading", { name: "Meet other authors" }),
        screen.getByLabelText(allFormFields.search.label),
      ];

      manageContacts.forEach((element) => expect(element).toBeInTheDocument());
    });
  });
});
