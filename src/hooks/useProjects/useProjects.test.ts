import { renderHook, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import endpoints from "../../configs/endpoints";
import { loadAllActionCreator } from "../../store/slices/projects/projectsSlice";
import { closeActionCreator } from "../../store/slices/uiModal/uiModalSlice";
import mockProject from "../../test-utils/mocks/mockProject";
import { Wrapper } from "../../test-utils/render/Wrapper";
import useProjects from "./useProjects";

const mockUseDispatch = jest.fn();

jest.mock("../../app/hooks", () => ({
  ...jest.requireActual("../../app/hooks"),
  useAppDispatch: () => mockUseDispatch,
}));

describe("Given a getAll function returned by a useProjects function", () => {
  describe("When called", () => {
    const {
      result: {
        current: { getAll },
      },
    } = renderHook(useProjects, { wrapper: Wrapper });
    test("Then it should dispatch the load projects action with the received data", async () => {
      endpoints.getAll = "/projects/all";

      act(async () => {
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

        act(async () => {
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
