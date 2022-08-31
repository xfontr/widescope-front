import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { render } from "../../test-utils/render/customRender";
import NavigationMenu from "./NavigationMenu";

describe("Given a NavigationMenu component", () => {
  describe("When instantiated", () => {
    test("Then it should show a simple burger menu icon", () => {
      render(<NavigationMenu />);

      const burgerIcon = screen.getByTestId("burger-icon");

      const unexpectedNavigationElements = [
        screen.queryByRole("link", { name: "Home" }),
        screen.queryByRole("link", { name: "Sign up" }),
        screen.queryByRole("link", { name: "Log in" }),
      ];

      expect(burgerIcon).toBeInTheDocument();

      unexpectedNavigationElements.forEach((element) =>
        expect(element).not.toBeInTheDocument()
      );
    });
  });

  describe("When instantiated and once clicked the burger-icon", () => {
    test("Then it should also show the navigation links", async () => {
      render(<NavigationMenu />);

      const burgerIcon = screen.getByTestId("burger-icon");
      await userEvent.click(burgerIcon);

      const navigationElements = [
        screen.getByRole("link", { name: "Home" }),
        screen.getByRole("link", { name: "Sign up" }),
        screen.getByRole("link", { name: "Log in" }),
        burgerIcon,
      ];

      navigationElements.forEach((element) =>
        expect(element).toBeInTheDocument()
      );
    });

    test("Then it should hide all the elements if the burger-icon is clicked again", async () => {
      render(<NavigationMenu />);

      const burgerIcon = screen.getByTestId("burger-icon");
      await userEvent.click(burgerIcon);
      await userEvent.click(burgerIcon);

      const unexpectedNavigationElements = [
        screen.queryByRole("link", { name: "Home" }),
        screen.queryByRole("link", { name: "Sign up" }),
        screen.queryByRole("link", { name: "Log in" }),
      ];

      expect(burgerIcon).toBeInTheDocument();

      unexpectedNavigationElements.forEach((element) =>
        expect(element).not.toBeInTheDocument()
      );
    });

    test("The it should also hide the elements if the user clicks outside the navigation bar", async () => {
      render(<NavigationMenu />);

      const burgerIcon = screen.getByTestId("burger-icon");
      await userEvent.click(burgerIcon);

      const closeModalArea = screen.getByTestId("modal-close-area");
      await userEvent.click(closeModalArea);

      const unexpectedNavigationElements = [
        screen.queryByRole("link", { name: "Home" }),
        screen.queryByRole("link", { name: "Sign up" }),
        screen.queryByRole("link", { name: "Log in" }),
      ];

      expect(burgerIcon).toBeInTheDocument();

      unexpectedNavigationElements.forEach((element) =>
        expect(element).not.toBeInTheDocument()
      );
    });
  });
});
