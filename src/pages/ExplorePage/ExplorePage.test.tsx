import { render as reactRender, waitFor } from "@testing-library/react";
import mockProject from "../../test-utils/mocks/mockProject";
import mockUser from "../../test-utils/mocks/mockUser";
import { render, screen } from "../../test-utils/render/customRender";
import { WrapperWithMockStore } from "../../test-utils/render/Wrapper";
import ExplorePage from "./ExplorePage";
import userEvent from "@testing-library/user-event";

describe("Given a ExplorePage component", () => {
  describe("When instantiated", () => {
    test("Then it should show a title, the projects retreived and the pagination", async () => {
      render(<ExplorePage />);

      const heading = screen.getByRole("heading", {
        name: "These are the latest projects",
      });

      const cards = await screen.findAllByRole("heading", {
        name: mockProject.name,
        level: 3,
      });

      expect(heading).toBeInTheDocument();
      expect(cards).toHaveLength(1);

      const pagination = [
        screen.getByRole("button", { name: "»" }),
        screen.getByRole("button", { name: "«" }),
      ];

      pagination.forEach((page) => expect(page).toBeInTheDocument());
    });
  });

  describe("When intantiated but no projects are found", () => {
    test("Then it should show a message 'No projects found.'", async () => {
      reactRender(<ExplorePage />, { wrapper: WrapperWithMockStore });

      const cards = screen.queryByRole("heading", {
        name: mockProject.name,
        level: 3,
      });

      const message = await screen.findByText("No projects found.");

      expect(cards).toBeNull();
      expect(message).toBeInTheDocument();
    });
  });

  describe("When instantiated and the user clicks an author tag", () => {
    test("Then it should show only the projects of the selected user", async () => {
      render(<ExplorePage />);

      const author = await screen.findByText(mockUser.name);
      await userEvent.click(author);

      const heading = await screen.findByRole("heading", {
        name: `Projects by ${mockUser.name}`,
      });

      const projectByAnotherAuthor = screen.queryByText("Fake author");
      const projectByThisAuthor = screen.getAllByText(mockProject.name);

      expect(heading).toBeInTheDocument();
      expect(projectByThisAuthor).toHaveLength(1);

      await waitFor(() => {
        expect(projectByAnotherAuthor).not.toBeInTheDocument();
      });
    });

    describe("When instantiated and the user clicks a technology tag", () => {
      test("Then it should show only the projects of the selected technology", async () => {
        render(<ExplorePage />);

        const technologyTag = screen.getAllByText(mockProject.technologies[0]);
        await userEvent.click(technologyTag[0]);

        const currentQuery = screen.queryByText(
          `Searching by: Technology (${mockProject.technologies[0]})`
        );
        const projects = screen.getAllByText(mockProject.name);

        expect(currentQuery).toBeInTheDocument();
        expect(projects).toHaveLength(1);
      });
    });

    describe("When instantiated and the user sets a filter", () => {
      test("Then it should appear a link to reset the filters and see all projects again", async () => {
        render(<ExplorePage />);

        const author = await screen.findByText(mockUser.name);
        await userEvent.click(author);
        const navigationLink = screen.getByText("« Keep exploring");

        expect(navigationLink).toBeInTheDocument();

        await userEvent.click(navigationLink);

        expect(navigationLink).not.toBeInTheDocument();

        const heading = await screen.findByRole("heading", {
          name: "These are the latest projects",
        });
        const projectByAnotherAuthor = screen.queryByText("Fake author");
        const projectByThisAuthor = screen.getByText(mockProject.name);

        expect(heading).toBeInTheDocument();
        expect(projectByAnotherAuthor).toBeInTheDocument();
        expect(projectByThisAuthor).toBeInTheDocument();
      });
    });
  });
});
