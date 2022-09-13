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

export interface IMessage {
  current: string;
  friend: string;
  history: {
    user: string;
    content: string;
  }[];
}

const Messages = ({ friend }: MessageProps): JSX.Element => {
  const { name } = useAppSelector(({ user }) => user.user);

  socket!.open();

  const messageInitialState: IMessage = {
    current: "",
    friend: friend,
    history: [
      {
        user: "",
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
          user: name!,
          content: messages.current,
        },
      ],
    });
  };

  return (
    <MessagesStyled>
      <div className="modal-container">
        <ul className="messages">
          {messages.history.map((message, index) => (
            <>
              {message.content && (
                <Message
                  user={message.user}
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
      </div>
    </MessagesStyled>
  );
};

export default Messages;
