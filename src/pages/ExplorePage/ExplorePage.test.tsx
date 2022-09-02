import { render, screen } from "../../test-utils/render/customRender";
import ExplorePage from "./ExplorePage";

describe("Given a ExplorePage component", () => {
  describe("When instantiated", () => {
    test("Then it should show a title and the projects retreived", () => {
      render(<ExplorePage />);

      const heading = screen.getByRole("heading", {
        name: "These are the latest projects",
      });

      expect(heading).toBeInTheDocument();
    });
  });
});
