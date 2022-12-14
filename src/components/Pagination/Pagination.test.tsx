import {
  fireEvent,
  render,
  screen,
} from "../../test-utils/render/customRender";
import userEvent from "@testing-library/user-event";
import Pagination from "./Pagination";

let mockTotalProjects = 30;

jest.mock("../../app/hooks", () => ({
  ...jest.requireActual("../../app/hooks"),
  useAppSelector: () => mockTotalProjects,
}));

const mockScroll = jest.fn();

window.scrollTo = mockScroll;

describe("Given a Pagination component", () => {
  describe("When instantiated with a page number and a setter function", () => {
    const mockSetter = jest.fn() as React.Dispatch<
      React.SetStateAction<number>
    >;

    test("Then it should show 4 buttons to change the page and the current page", () => {
      const page = 1;
      render(<Pagination page={page} setPage={mockSetter} />);

      const pagination = [
        screen.getByRole("button", { name: "»" }),
        screen.getByRole("button", { name: "«" }),
        screen.getByRole("button", { name: "1" }),
        screen.getByRole("button", { name: "3" }),
        screen.getByText(page + 1),
      ];

      pagination.forEach((page) => expect(page).toBeInTheDocument());
    });

    test("Then it should show nothing if the number of projects is less than 10 and it's the first page", () => {
      const page = 0;
      mockTotalProjects = 1;
      render(<Pagination page={page} setPage={mockSetter} />);

      const pagination = [
        screen.queryByRole("button", { name: "»" }),
        screen.queryByRole("button", { name: "«" }),
        screen.queryByRole("button", { name: "1" }),
        screen.queryByRole("button", { name: "3" }),
        screen.queryByText(page + 1),
      ];

      pagination.forEach((page) => expect(page).not.toBeInTheDocument());
    });

    test("When clicking the backward button, it should call the setter function with one page less", async () => {
      const page = 2;
      render(<Pagination page={page} setPage={mockSetter} />);

      const backwardsButton = screen.getByRole("button", { name: "«" });

      await userEvent.click(backwardsButton);

      expect(mockSetter).toHaveBeenCalledWith(page - 1);
    });

    test("When clicking the backward button, if it's the first page, it should not call the setter", () => {
      mockTotalProjects = 10;
      const page = 0;
      render(<Pagination page={page} setPage={mockSetter} />);

      const backwardsButton = screen.getByRole("button", { name: "«" });

      fireEvent.click(backwardsButton);

      expect(mockSetter).not.toHaveBeenCalled();
    });

    test("When clicking the forward button, it should call the setter function with the next page number", async () => {
      const page = 0;

      render(<Pagination page={page} setPage={mockSetter} />);

      const forwardButton = screen.getByRole("button", { name: "»" });

      await userEvent.click(forwardButton);

      expect(mockSetter).toHaveBeenCalledWith(page + 1);
    });

    test("When clicking the forward button, it should not call the setter function if it's the last page", () => {
      mockTotalProjects = 9;

      const page = 1;

      render(<Pagination page={page} setPage={mockSetter} />);

      const forwardButton = screen.getByRole("button", { name: "»" });

      fireEvent.click(forwardButton);

      expect(mockSetter).not.toHaveBeenCalled();
    });

    test("When clicking the previous page button, it should call the setter function with the shown page", async () => {
      const page = 1;

      render(<Pagination page={page} setPage={mockSetter} />);

      const backwardButton = screen.getByRole("button", { name: `${page}` });

      await userEvent.click(backwardButton);

      expect(mockSetter).toHaveBeenCalledWith(page - 1);
    });

    test("When clicking the previous page, it should do nothing if it's the first page", () => {
      mockTotalProjects = 10;

      const page = 0;

      render(<Pagination page={page} setPage={mockSetter} />);

      const backwardButton = screen.getByRole("button", {
        name: `${page}`,
      });

      fireEvent.click(backwardButton);

      expect(mockSetter).not.toHaveBeenCalled();
    });

    test("When clicking the next page button, it should call the setter function with the shown page", async () => {
      mockTotalProjects = 30;
      const page = 1;

      render(<Pagination page={page} setPage={mockSetter} />);

      const forwardButton = screen.getByRole("button", {
        name: `${page + 2}`,
      });

      await userEvent.click(forwardButton);

      expect(mockSetter).toHaveBeenCalledWith(page + 1);
    });

    test("When clicking the next page, it should do nothing if it's the last page", () => {
      mockTotalProjects = 9;
      const page = 1;

      render(<Pagination page={page} setPage={mockSetter} />);

      const forwardButton = screen.getByRole("button", {
        name: `${page + 2}`,
      });

      fireEvent.click(forwardButton);

      expect(mockSetter).not.toHaveBeenCalled();
    });

    test("When clicking any button, it should scroll to the top of the page", async () => {
      mockTotalProjects = 30;
      const page = 1;
      render(<Pagination page={page} setPage={mockSetter} />);

      const pagination = [
        screen.getByRole("button", { name: "»" }),
        screen.getByRole("button", { name: "«" }),
        screen.getByRole("button", { name: "1" }),
        screen.getByRole("button", { name: "3" }),
        screen.getByText(page + 1),
      ];

      await userEvent.click(pagination[Math.floor(Math.random() * 2)]);

      expect(mockScroll).toHaveBeenCalled();
    });
  });
});
