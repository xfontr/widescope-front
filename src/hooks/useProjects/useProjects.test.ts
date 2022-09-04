import { waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import endpoints from "../../configs/endpoints";
import {
  addProjectActionCreator,
  loadAllActionCreator,
} from "../../store/slices/projects/projectsSlice";
import {
  closeActionCreator,
  setVisibilityActionCreator,
} from "../../store/slices/uiModal/uiModalSlice";
import mockProject from "../../test-utils/mocks/mockProject";
import mockUseDispatch from "../../test-utils/mocks/mockUseAppDispatch";
import { renderHook } from "../../test-utils/render/customRender";
import useProjects from "./useProjects";

describe("Given a getAll function returned by a useProjects function", () => {
  describe("When called", () => {
    const {
      result: {
        current: { getAll },
      },
    } = renderHook(useProjects);

    test("Then it should dispatch the load projects action with the received data", async () => {
      endpoints.getAll = "/projects/all";

      await act(async () => {
        await getAll();
      });

      await waitFor(() => {
        expect(mockUseDispatch).toHaveBeenCalledWith(
          loadAllActionCreator([mockProject])
        );
      });
    });

    describe("When called with no projects being at the API", () => {
      test("Then it should dispatch the ui modal with a not found error", async () => {
        endpoints.getAll = "/projects/allWithError";

        await act(async () => {
          await getAll();
        });

        await waitFor(() => {
          expect(mockUseDispatch).toHaveBeenCalledWith(
            closeActionCreator({
              message:
                "Error while loading projects: AxiosError: Request failed with status code 404",
              type: "error",
            })
          );
        });
      });
    });
  });
});

describe("Given a getById function returned by a useProjects function", () => {
  const {
    result: {
      current: { getById },
    },
  } = renderHook(useProjects);

  describe("When called", () => {
    test("Then it should open the ui modal for loading", async () => {
      // eslint-disable-next-line testing-library/no-await-sync-query
      await getById(mockProject.id);

      expect(mockUseDispatch).toHaveBeenCalledWith(
        setVisibilityActionCreator(true)
      );
    });
  });

  describe("When called with an actual project id as an argument", () => {
    test("Then it should return a project and close the modal loading", async () => {
      // eslint-disable-next-line testing-library/no-await-sync-query
      const project = await getById(mockProject.id);

      expect(project).toStrictEqual(mockProject);
    });
  });

  describe("When called with an id that has no existing project", () => {
    test("Then it should return undefined", async () => {
      // eslint-disable-next-line testing-library/no-await-sync-query
      const project = await getById("falseId");

      expect(project).toBeUndefined();
    });

    test("Then it should call the dispatch to close the modal with error", async () => {
      // eslint-disable-next-line testing-library/no-await-sync-query
      await getById("falseId");

      expect(mockUseDispatch).toHaveBeenCalledWith(
        closeActionCreator({
          message:
            "Error while loading projects: AxiosError: Request failed with status code 404",
          type: "error",
        })
      );
    });
  });
});

describe("Given a create function returned by a useProjects function", () => {
  describe("When called with a valid project in a formData as an argument", () => {
    const project = new FormData();

    project.append("project", JSON.stringify(mockProject));
    project.append("logo", new File([""], ""));

    const {
      result: {
        current: { create },
      },
    } = renderHook(useProjects);

    test("Then it should call the dispatch to open the loading modal", async () => {
      await act(async () => {
        await create(project);
      });

      await waitFor(() => {
        expect(mockUseDispatch).toHaveBeenCalledWith(
          setVisibilityActionCreator(true)
        );
      });
    });

    test("Then it should call the projects dispatch an add the returned project from the API", async () => {
      await act(async () => {
        await create(project);
      });

      await waitFor(() => {
        expect(mockUseDispatch).toHaveBeenCalledWith(
          addProjectActionCreator(mockProject)
        );
      });
    });

    test("Then it should call the dispatch to open the success modal", async () => {
      await act(async () => {
        await create(project);
      });

      await waitFor(() => {
        expect(mockUseDispatch).toHaveBeenCalledWith(
          closeActionCreator({
            message: "Project created successfully",
            type: "success",
          })
        );
      });
    });
  });

  describe("When called but the create fetch fails", () => {
    const project = new FormData();

    project.append("project", JSON.stringify(mockProject));
    project.append("logo", new File([""], ""));

    const {
      result: {
        current: { create },
      },
    } = renderHook(useProjects);

    test("Then it should call the dispatch to open the error modal", async () => {
      endpoints.createProject = "/projects/newError";

      await act(async () => {
        await create(project);
      });

      await waitFor(() => {
        expect(mockUseDispatch).toHaveBeenCalledWith(
          closeActionCreator({
            message: `Error while creating the project: AxiosError: Request failed with status code 400`,
            type: "error",
          })
        );
      });
    });
  });
});
