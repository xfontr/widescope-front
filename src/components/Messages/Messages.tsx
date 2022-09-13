import { useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { InputStyled } from "../RenderForm/RenderFormStyled";
import Button from "../Button/Button";
import socket from "../../sockets";
import openListener from "./openListener";
import Message from "../Message/Message";
import MessagesStyled from "./MessagesStyled";

interface MessageProps {
  friend: string;
}

const Messages = ({ friend }: MessageProps): JSX.Element => {
  const { name } = useAppSelector(({ user }) => user.user);

  socket!.open();

  const messageInitialState = {
    current: "",
    friend: friend,
    history: [
      {
        isUser: false,
        content: "",
      },
    ],
  };

  const [messages, setMessage] = useState(messageInitialState);

  openListener(friend, messages.current, messages, setMessage);

  const handleSubmit = (event: any) => {
    event.preventDefault();

    if (!messages.current) {
      return;
    }

    socket!.emit(`MESSAGE_FROM:${name}`, messages.current, messages.friend);
    setMessage({
      ...messages,
      history: [
        ...messages.history,
        {
          isUser: true,
          content: messages.current,
        },
      ],
    });
  };

  return (
    <MessagesStyled>
      <ul className="messages">
        {messages.history.map((message, index) => (
          <>
            {message.content && (
              <Message
                user={message.isUser ? "You" : messages.friend}
                message={message.content}
                index={index}
              />
            )}
          </>
        ))}
      </ul>

      <form className="messages__send" onSubmit={handleSubmit}>
        <InputStyled
          type="text"
          value={messages.current}
          onChange={(e) =>
            setMessage({
              ...messages,
              current: e.target.value,
            })
          }
        />
        <Button>Send</Button>
      </form>
    </MessagesStyled>
  );
};

export default Messages;
