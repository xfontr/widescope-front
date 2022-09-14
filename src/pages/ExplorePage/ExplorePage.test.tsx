import { render as reactRender, waitFor } from "@testing-library/react";
import mockProject from "../../test-utils/mocks/mockProject";
import mockUser from "../../test-utils/mocks/mockUser";
import { render, screen } from "../../test-utils/render/customRender";
import { WrapperWithMockStore } from "../../test-utils/render/Wrapper";
import ExplorePage from "./ExplorePage";
import userEvent from "@testing-library/user-event";
import {
  GetAllProjects,
  UserProjects,
} from "../../hooks/types/useProjectTypes";
import { AxiosResponse } from "axios";
import { Provider } from "react-redux";
import { store } from "../../app/store";
import { ThemeProvider } from "styled-components";
import { BrowserRouter } from "react-router-dom";
import GlobalStyles from "../../styles/GlobalStyles";
import styledMainTheme from "../../styles/styledMainTheme";
import renderer from "react-test-renderer";

const mockAmountOfProjects = 9;
const mockListOfProjects = new Array(mockAmountOfProjects).fill(mockProject);
let mockResolvedValue: Partial<AxiosResponse<UserProjects | GetAllProjects>> = {
  data: {
    projects: {
      offset: 0,
      limit: 0,
      list: [
        ...mockListOfProjects,
        {
          ...mockProject,
          author: "Fake author",
          technologies: ["false", "false"],
        },
      ],
    },
  },
};

jest.mock("axios", () => ({
  get: () => mockResolvedValue,
}));

describe("Given a ExplorePage component", () => {
  describe("When instantiated", () => {
    test("Then it should match the snapshot", () => {
      const expectedPage = renderer.create(
        <Provider store={store}>
          <ThemeProvider theme={styledMainTheme}>
            <BrowserRouter>
              <GlobalStyles />
              <ExplorePage />
            </BrowserRouter>
          </ThemeProvider>
        </Provider>
      );

      expect(expectedPage).toMatchSnapshot();
    });

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
      expect(cards).toHaveLength(mockAmountOfProjects + 1);

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
      mockResolvedValue = {
        data: {
          projectsByAuthor: {
            author: mockProject.author,
            total: 9,
            projects: [...mockListOfProjects],
          },
        },
      };

      render(<ExplorePage />);

      const author = await screen.findAllByText(mockUser.name);

      await userEvent.click(author[0]);

      const heading = await screen.findByRole("heading", {
        name: `Projects by ${mockUser.name}`,
      });

      const projectByAnotherAuthor = screen.queryByText("Fake author");
      const projectByThisAuthor = screen.getAllByText(mockProject.name);

      expect(heading).toBeInTheDocument();
      expect(projectByThisAuthor).toHaveLength(mockAmountOfProjects);

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
        const projectTechnologies = screen.getAllByText(
          mockProject.technologies[0]
        );

        expect(currentQuery).toBeInTheDocument();
        expect(projectTechnologies).toHaveLength(mockAmountOfProjects);
      });
    });

    describe("When instantiated and the user sets a filter", () => {
      test("Then it should appear a link to reset the filters and see all projects again", async () => {
        render(<ExplorePage />);

        const author = await screen.findAllByText(mockUser.name);
        await userEvent.click(author[0]);
        const navigationLink = screen.getByText("« Keep exploring");

        expect(navigationLink).toBeInTheDocument();

        await userEvent.click(navigationLink);

        expect(navigationLink).not.toBeInTheDocument();

        const heading = await screen.findByRole("heading", {
          name: "These are the latest projects",
        });
        const projecstByThisAuthor = screen.getAllByText(mockProject.name);

        expect(heading).toBeInTheDocument();
        expect(projecstByThisAuthor).toHaveLength(mockAmountOfProjects + 1);
      });
    });
  });
});
