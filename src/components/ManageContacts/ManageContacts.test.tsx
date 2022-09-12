import { allFormFields } from "../../configs/allFormFields";
import { render, screen } from "../../test-utils/render/customRender";
import ManageContacts from "./ManageContacts";

describe("Given a ManageContacts component", () => {
  describe("When instantiated with visibility true", () => {
    test("Then there should be a heading and a search form", () => {
      render(<ManageContacts visibility={true} />);

      const manageContacts = [
        screen.getByRole("heading", { name: "Your contacts" }),
        screen.getByLabelText(allFormFields.search.label),
      ];

      manageContacts.forEach((element) => expect(element).toBeInTheDocument());
    });
  });

  describe("When instantiated with visibility false", () => {
    test("Then there should not be any of the previous components", () => {
      render(<ManageContacts visibility={false} />);

      const manageContacts = [
        screen.queryByRole("heading", { name: "Your contacts" }),
        screen.queryByRole(allFormFields.search.label),
      ];

      manageContacts.forEach((element) =>
        expect(element).not.toBeInTheDocument()
      );
    });
  });
});
