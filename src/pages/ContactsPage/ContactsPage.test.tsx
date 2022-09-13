import { render as reactRender } from "@testing-library/react";
import { allFormFields } from "../../configs/allFormFields";
import mockContact from "../../test-utils/mocks/mockContact";
import { render, screen } from "../../test-utils/render/customRender";
import { WrapperWithMockStore } from "../../test-utils/render/Wrapper";
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

    test("Then it should load all the friends at the store after fetching the database", async () => {
      reactRender(<ManageContacts />, { wrapper: WrapperWithMockStore });

      const friends = await screen.findAllByRole("heading", {
        name: mockContact.name,
        level: 3,
      });

      friends.forEach((friend) => expect(friend).toBeInTheDocument());
    });
  });

  describe("When instantiated but the user has no friends", () => {
    test("Then it should not load any friend", () => {
      render(<ManageContacts />);

      const friends = screen.queryAllByRole("heading", {
        name: mockContact.name,
        level: 3,
      });

      friends.forEach((friend) => expect(friend).not.toBeInTheDocument());
    });
  });
});
