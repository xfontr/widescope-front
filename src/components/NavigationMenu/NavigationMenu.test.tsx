import {
  screen,
  render as reactRender,
  renderHook,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useLocation } from "react-router-dom";
import routes from "../../configs/routes";
import { render } from "../../test-utils/render/customRender";
import { Wrapper, WrapperWithMockStore } from "../../test-utils/render/Wrapper";
import NavigationMenu from "./NavigationMenu";

describe("Given a NavigationMenu component", () => {
  describe("When instantiated", () => {
    test("Then it should show a simple burger menu icon", () => {
      render(<NavigationMenu />);

      const burgerIcon = screen.getByTestId("burger-icon");

      const unexpectedNavigationElements = [
        screen.queryByRole("link", { name: "Home" }),
        screen.queryByRole("link", { name: "Explore" }),
        screen.queryByRole("link", { name: "Sign up" }),
        screen.queryByRole("link", { name: "Log in" }),
        screen.queryByRole("link", { name: "Log out" }),
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
        screen.getByRole("link", { name: "Explore" }),
        screen.getByRole("link", { name: "Sign up" }),
        screen.getByRole("link", { name: "Log in" }),
        burgerIcon,
      ];

      navigationElements.forEach((element) =>
        expect(element).toBeInTheDocument()
      );
    });

    test("If the user is logged, log out should appear instead of log in", async () => {
      reactRender(<NavigationMenu />, { wrapper: WrapperWithMockStore });

      const burgerIcon = screen.getByTestId("burger-icon");
      await userEvent.click(burgerIcon);

      const logInLink = screen.queryByRole("link", { name: "Log in" });
      const logOutLink = screen.getByRole("link", { name: "Log out" });

      expect(logInLink).not.toBeInTheDocument();
      expect(logOutLink).toBeInTheDocument();
    });

    test("Then it should hide all the elements if the burger-icon is clicked again", async () => {
      render(<NavigationMenu />);

      const burgerIcon = screen.getByTestId("burger-icon");
      await userEvent.click(burgerIcon);
      await userEvent.click(burgerIcon);

      const unexpectedNavigationElements = [
        screen.queryByRole("link", { name: "Home" }),
        screen.queryByRole("link", { name: "Explore" }),
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

describe("Given the links of the NavigationMenu component", () => {
  describe("When clicked the 'home' link", () => {
    test(`Then it should route the page to ${routes.root}`, async () => {
      render(<NavigationMenu />);

      const burgerIcon = screen.getByTestId("burger-icon");
      await userEvent.click(burgerIcon);

      const homeLink = screen.getByRole("link", { name: "Home" });
      await userEvent.click(homeLink);

      const {
        result: {
          current: { pathname },
        },
      } = renderHook(useLocation, { wrapper: Wrapper });

      expect(pathname).toBe(routes.root);
    });
  });

  describe("When clicked the 'Sign up' link", () => {
    test(`Then it should route the page to '${routes.signUp}'`, async () => {
      render(<NavigationMenu />);

      const burgerIcon = screen.getByTestId("burger-icon");
      await userEvent.click(burgerIcon);

      const homeLink = screen.getByRole("link", { name: "Sign up" });
      await userEvent.click(homeLink);

      const {
        result: {
          current: { pathname },
        },
      } = renderHook(useLocation, { wrapper: Wrapper });

      expect(pathname).toBe(routes.signUp);
    });
  });

  describe("When clicked the 'Log out' link", () => {
    test(`Then it should route the page to '${routes.logIn}'`, async () => {
      reactRender(<NavigationMenu />, { wrapper: WrapperWithMockStore });

      const burgerIcon = screen.getByTestId("burger-icon");
      await userEvent.click(burgerIcon);

      const homeLink = screen.getByRole("link", { name: "Log out" });
      await userEvent.click(homeLink);

      const {
        result: {
          current: { pathname },
        },
      } = renderHook(useLocation, { wrapper: Wrapper });

      expect(pathname).toBe(routes.logIn);
    });
  });

  describe("When clicked the 'Log in' link", () => {
    test(`Then it should route the page to '${routes.logIn}'`, async () => {
      render(<NavigationMenu />);

      const burgerIcon = screen.getByTestId("burger-icon");
      await userEvent.click(burgerIcon);

      const homeLink = screen.getByRole("link", { name: "Log in" });
      await userEvent.click(homeLink);

      const {
        result: {
          current: { pathname },
        },
      } = renderHook(useLocation, { wrapper: Wrapper });

      expect(pathname).toBe(routes.logIn);
    });
  });

  describe("When clicked the 'Explore' link", () => {
    test(`Then it should route the page to '${routes.explore}'`, async () => {
      render(<NavigationMenu />);

      const burgerIcon = screen.getByTestId("burger-icon");
      await userEvent.click(burgerIcon);

      const exploreLink = screen.getByRole("link", { name: "Explore" });
      await userEvent.click(exploreLink);

      const {
        result: {
          current: { pathname },
        },
      } = renderHook(useLocation, { wrapper: Wrapper });

      expect(pathname).toBe(routes.explore);
    });
  });
});
