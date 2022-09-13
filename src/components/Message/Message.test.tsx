import mockUser from "../../test-utils/mocks/mockUser";
import { render, screen } from "../../test-utils/render/customRender";
import Message from "./Message";

describe("Given a Message component", () => {
  describe("When called with all the message information (message, sender...)", () => {
    test("Then it should display the message with the author", () => {
      render(<Message message="Message" user={mockUser.name} index={1} />);

      const message = [
        screen.getByText("Message"),
        screen.getByText(mockUser.name),
      ];

      message.forEach((element) => expect(element).toBeInTheDocument());
    });
  });
});
