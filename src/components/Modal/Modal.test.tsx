import { screen } from "@testing-library/react";
import { render } from "../../test-utils/render/customRender";
import Modal from "./Modal";

describe("Given a Modal component", () => {
  describe("When instantiated", () => {
    test("Then it should show a fixed modal with a message", () => {
      const defaultTextMessage = "Loading";
      render(<Modal />);

      const message = screen.getByText(defaultTextMessage);

      expect(message).toBeInTheDocument();
    });
  });
});
