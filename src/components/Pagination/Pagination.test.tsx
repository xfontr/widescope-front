import { render, screen } from "../../test-utils/render/customRender";
import userEvent from "@testing-library/user-event";
import Pagination from "./Pagination";

describe("Given a Pagination component", () => {
  describe("When instantiated with a page number and a setter function", () => {
    test("Then it should show two buttons to change the page and the current page", () => {
      const mockSetter = jest.fn() as React.Dispatch<
        React.SetStateAction<number>
      >;
      const page = 1;
      render(<Pagination page={page} setPage={mockSetter} />);

      const pagination = [
        screen.getByRole("button", { name: "»" }),
        screen.getByRole("button", { name: "«" }),
        screen.getByText(page),
      ];

      pagination.forEach((page) => expect(page).toBeInTheDocument());
    });

    test("When clicking the buttons, it should call the setter function", async () => {
      const mockSetter = jest.fn() as React.Dispatch<
        React.SetStateAction<number>
      >;
      const page = 1;
      render(<Pagination page={page} setPage={mockSetter} />);

      const backwardsButton = screen.getByRole("button", { name: "»" });
      const forwardButton = screen.getByRole("button", { name: "«" });

      await userEvent.click(backwardsButton);
      await userEvent.click(forwardButton);

      expect(mockSetter).toHaveBeenCalledTimes(2);
    });
  });
});
