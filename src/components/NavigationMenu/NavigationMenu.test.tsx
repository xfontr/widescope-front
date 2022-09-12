import { screen, render as reactRender } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useLocation } from "react-router-dom";
import { navRoutes } from "../../configs/routes";
import mockUser from "../../test-utils/mocks/mockUser";
import { render, renderHook } from "../../test-utils/render/customRender";
import { WrapperWithMockStore } from "../../test-utils/render/Wrapper";
import NavigationMenu from "./NavigationMenu";

const mockLogOut = jest.fn();

jest.mock("../../hooks/useUser/useUser", () => () => ({
  ...jest.requireActual("../../hooks/useUser/useUser"),
  logOut: mockLogOut,
}));

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

    test("If the user is logged, log out should appear instead of log in and sign up", async () => {
      reactRender(<NavigationMenu />, { wrapper: WrapperWithMockStore });

      const burgerIcon = screen.getByTestId("burger-icon");
      await userEvent.click(burgerIcon);

      const logInLink = screen.queryByRole("link", { name: "Log in" });
      const signUpLink = screen.queryByRole("link", { name: "SignUp" });
      const logOutLink = screen.getByRole("link", { name: "Log out" });

      expect(logInLink).not.toBeInTheDocument();
      expect(signUpLink).not.toBeInTheDocument();
      expect(logOutLink).toBeInTheDocument();
    });

    test("If the user is logged, its name should appear", async () => {
      reactRender(<NavigationMenu />, { wrapper: WrapperWithMockStore });

      const burgerIcon = screen.getByTestId("burger-icon");
      await userEvent.click(burgerIcon);

      const userName = screen.getByText(`Welcome,${mockUser.name}`);

      expect(userName).toBeInTheDocument();
    });

    test("If the user is not logged, the post a project button should not appear", async () => {
      render(<NavigationMenu />);

      const burgerIcon = screen.getByTestId("burger-icon");
      await userEvent.click(burgerIcon);

      const postProject = screen.queryByRole("button", {
        name: "Post a project",
      });

      expect(postProject).not.toBeInTheDocument();
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
    test(`Then it should route the page to ${navRoutes.home.path} and close the menu`, async () => {
      render(<NavigationMenu />);

      const burgerIcon = screen.getByTestId("burger-icon");
      await userEvent.click(burgerIcon);

      const homeLink = screen.getByRole("link", { name: "Home" });
      await userEvent.click(homeLink);

      const {
        result: {
          current: { pathname },
        },
      } = renderHook(useLocation);

      expect(pathname).toBe(navRoutes.home.path);
      expect(homeLink).not.toBeInTheDocument();
    });
  });

  describe("When clicked the 'Sign up' link", () => {
    test(`Then it should route the page to '${navRoutes.signUp.path}' and close the menu`, async () => {
      render(<NavigationMenu />);

      const burgerIcon = screen.getByTestId("burger-icon");
      await userEvent.click(burgerIcon);

      const signUpLink = screen.getByRole("link", { name: "Sign up" });
      await userEvent.click(signUpLink);

      const {
        result: {
          current: { pathname },
        },
      } = renderHook(useLocation);

      expect(pathname).toBe(navRoutes.signUp.path);
      expect(signUpLink).not.toBeInTheDocument();
    });
  });

  describe("When clicked the 'Log out' link", () => {
    test(`Then it should call the logOut function and close the menu`, async () => {
      reactRender(<NavigationMenu />, { wrapper: WrapperWithMockStore });

      const burgerIcon = screen.getByTestId("burger-icon");
      await userEvent.click(burgerIcon);

      const logOutLink = screen.getByRole("link", { name: "Log out" });
      await userEvent.click(logOutLink);

      expect(mockLogOut).toHaveBeenCalled();
      expect(logOutLink).not.toBeInTheDocument();
    });
  });

  describe("When clicked the 'Log in' link", () => {
    test(`Then it should route the page to '${navRoutes.logIn.path}' and close the menu`, async () => {
      render(<NavigationMenu />);

      const burgerIcon = screen.getByTestId("burger-icon");
      await userEvent.click(burgerIcon);

      const logInLink = screen.getByRole("link", { name: "Log in" });
      await userEvent.click(logInLink);

      const {
        result: {
          current: { pathname },
        },
      } = renderHook(useLocation);

      expect(pathname).toBe(navRoutes.logIn.path);
      expect(logInLink).not.toBeInTheDocument();
    });
  });

  describe("When clicked the 'Explore' link", () => {
    test(`Then it should route the page to '${navRoutes.explore.path}' and close the menu`, async () => {
      render(<NavigationMenu />);

      const burgerIcon = screen.getByTestId("burger-icon");
      await userEvent.click(burgerIcon);

      const exploreLink = screen.getByRole("link", { name: "Explore" });
      await userEvent.click(exploreLink);

      const {
        result: {
          current: { pathname },
        },
      } = renderHook(useLocation);

      expect(pathname).toBe(navRoutes.explore.path);
      expect(exploreLink).not.toBeInTheDocument();
    });
  });

  describe("When clicked the 'Personal projects' link", () => {
    test(`Then it should route the page to '${navRoutes.personalProjects.path}' and close the menu`, async () => {
      reactRender(<NavigationMenu />, { wrapper: WrapperWithMockStore });

      const burgerIcon = screen.getByTestId("burger-icon");
      await userEvent.click(burgerIcon);

      const personalProjectsLink = screen.getByRole("link", {
        name: "Your projects",
      });
      await userEvent.click(personalProjectsLink);

      const {
        result: {
          current: { pathname },
        },
      } = renderHook(useLocation);

      expect(pathname).toBe(navRoutes.personalProjects.path);
      expect(personalProjectsLink).not.toBeInTheDocument();
    });
  });

  describe("When clicked the 'Post a project' button", () => {
    test(`Then it should route the page to '"/project/new"' and close the menu`, async () => {
      reactRender(<NavigationMenu />, { wrapper: WrapperWithMockStore });

      const burgerIcon = screen.getByTestId("burger-icon");
      await userEvent.click(burgerIcon);

      const postButton = screen.getByRole("button", {
        name: "Post a project",
      });
      await userEvent.click(postButton);

      const {
        result: {
          current: { pathname },
        },
      } = renderHook(useLocation);

      expect(pathname).toBe("/project/new");
      expect(postButton).not.toBeInTheDocument();
    });
  });
});
