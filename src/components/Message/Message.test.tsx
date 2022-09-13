import { render as reactRender } from "@testing-library/react";
import mockUser from "../../test-utils/mocks/mockUser";
import { render, screen } from "../../test-utils/render/customRender";
import { WrapperWithMockStore } from "../../test-utils/render/Wrapper";
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

    describe("If the author is the same user", () => {
      test("Then it should show 'You' instead of his name", () => {
        reactRender(
          <Message message="Message" user={mockUser.name} index={1} />,
          { wrapper: WrapperWithMockStore }
        );

        const messageAuthor = screen.getByText("You");
        const unexpectedName = screen.queryByText(mockUser.name);

        expect(messageAuthor).toBeInTheDocument();
        expect(unexpectedName).not.toBeInTheDocument();
      });
    });
  });
});
