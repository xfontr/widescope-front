import { renderHook, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import endpoints from "../../configs/endpoints";
import { loadAllActionCreator } from "../../store/slices/projects/projectsSlice";
import { closeActionCreator } from "../../store/slices/uiModal/uiModalSlice";
import mockProject from "../../test-utils/mocks/mockProject";
import mockUseDispatch from "../../test-utils/mocks/mockUseAppDispatch";
import { Wrapper } from "../../test-utils/render/Wrapper";
import { IProject } from "../../types/project";
import useProjects from "./useProjects";

describe("Given a getAll function returned by a useProjects function", () => {
  describe("When called", () => {
    const {
      result: {
        current: { getAll },
      },
    } = renderHook(useProjects, { wrapper: Wrapper });

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
  } = renderHook(useProjects, { wrapper: Wrapper });

  describe("When called with an actual project id as an argument", () => {
    test("Then it should return a project", async () => {
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
          message: `Error while loading projects: `,
          type: "error",
        })
      );
    });
  });
});
