import { allFormFields } from "../../configs/allFormFields";
import { render, screen, waitFor } from "../../test-utils/render/customRender";
import SearchBar from "./SearchBar";
import userEvent from "@testing-library/user-event";

const mockAddFriend = jest.fn();

jest.mock("../../hooks/useUser/useUser", () => () => ({
  addFriend: mockAddFriend,
}));

describe("Given a SearchBar component", () => {
  describe("When instantiated", () => {
    test("Then there should be a search bar with a button", () => {
      render(<SearchBar />);

      const searchBar = [
        screen.getByLabelText(allFormFields.search.label),
        screen.getByRole("button", { name: "Add friend" }),
      ];

      searchBar.forEach((element) => expect(element).toBeInTheDocument());
    });
  });

  describe("When instantiated, typed valid values and submitted", () => {
    test("Then it should call the addFriend function", async () => {
      const typedText = "name";
      render(<SearchBar />);

      const searchBar = [
        screen.getByLabelText(allFormFields.search.label),
        screen.getByRole("button", { name: "Add friend" }),
      ];

      await userEvent.type(searchBar[0], typedText);
      await userEvent.click(searchBar[1]);

      await waitFor(async () => {
        await expect(mockAddFriend).toHaveBeenCalled();
      });
    });
  });

  describe("When instantiated, typed invalid values and submitted", () => {
    test("Then it should not call the addFriend function", async () => {
      const typedText = "na";
      render(<SearchBar />);

      const searchBar = [
        screen.getByLabelText(allFormFields.search.label),
        screen.getByRole("button", { name: "Add friend" }),
      ];

      await userEvent.type(searchBar[0], typedText);
      await userEvent.click(searchBar[1]);

      await waitFor(async () => {
        await expect(mockAddFriend).not.toHaveBeenCalled();
      });
    });
  });
});
