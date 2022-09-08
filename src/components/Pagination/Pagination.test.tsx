import { render, screen } from "../../test-utils/render/customRender";
import userEvent from "@testing-library/user-event";
import Pagination from "./Pagination";

let mockTotalProjects = 30;

jest.mock("../../app/hooks", () => ({
  ...jest.requireActual("../../app/hooks"),
  useAppSelector: () => mockTotalProjects,
}));

describe("Given a Pagination component", () => {
  describe("When instantiated with a page number and a setter function", () => {
    test("Then it should show two buttons to change the page and the current page", () => {
      const mockSetter = jest.fn() as React.Dispatch<
        React.SetStateAction<number>
      >;
      const page = 0;
      render(<Pagination page={page} setPage={mockSetter} />);

      const pagination = [
        screen.getByRole("button", { name: "»" }),
        screen.getByRole("button", { name: "«" }),
        screen.getByText(page + 1),
      ];

      pagination.forEach((page) => expect(page).toBeInTheDocument());
    });

    test("When clicking the backward button, it should call the setter function with one page less", async () => {
      const mockSetter = jest.fn() as React.Dispatch<
        React.SetStateAction<number>
      >;
      const page = 2;
      render(<Pagination page={page} setPage={mockSetter} />);

      const backwardsButton = screen.getByRole("button", { name: "«" });

      await userEvent.click(backwardsButton);

      expect(mockSetter).toHaveBeenCalledWith(page - 1);
    });

    test("When clicking the backward button, if it's the first page, it should call the setter function with the same page", async () => {
      const mockSetter = jest.fn() as React.Dispatch<
        React.SetStateAction<number>
      >;
      const page = 0;
      render(<Pagination page={page} setPage={mockSetter} />);

      const backwardsButton = screen.getByRole("button", { name: "«" });

      await userEvent.click(backwardsButton);

      expect(mockSetter).toHaveBeenCalledWith(page);
    });

    test("When clicking the forward button, it should call the setter function with the next page number", async () => {
      const mockSetter = jest.fn() as React.Dispatch<
        React.SetStateAction<number>
      >;
      const page = 0;

      render(<Pagination page={page} setPage={mockSetter} />);

      const forwardButton = screen.getByRole("button", { name: "»" });

      await userEvent.click(forwardButton);

      expect(mockSetter).toHaveBeenCalledWith(page + 1);
    });

    test("When clicking the forward button, it should call the setter function with the same page if it's the last one", async () => {
      mockTotalProjects = 9;

      const mockSetter = jest.fn() as React.Dispatch<
        React.SetStateAction<number>
      >;
      const page = 0;

      render(<Pagination page={page} setPage={mockSetter} />);

      const forwardButton = screen.getByRole("button", { name: "»" });

      await userEvent.click(forwardButton);

      expect(mockSetter).toHaveBeenCalledWith(page);
    });
  });
});
