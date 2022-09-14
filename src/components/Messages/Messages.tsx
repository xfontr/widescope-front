import React, { SyntheticEvent, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { InputStyled } from "../RenderForm/RenderFormStyled";
import Button from "../Button/Button";
import socket from "../../sockets";
import openListener from "./openListener";
import Message from "../Message/Message";
import MessagesStyled from "./MessagesStyled";
import IContact from "../../types/IContact";

interface MessageProps {
  friend: IContact;
  close: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IMessage {
  current: string;
  friend: IContact;
  history: {
    user: IContact;
    content: string;
  }[];
}

const Messages = ({ friend, close }: MessageProps): JSX.Element => {
  const user: IContact = useAppSelector(({ user }) => ({
    id: user.user.id!,
    name: user.user.name!,
  }));

  socket!.open();

  const messageInitialState: IMessage = {
    current: "",
    friend: friend,
    history: [
      {
        user: {
          id: "",
          name: "",
        },
        content: "",
      },
    ],
  };

  const [messages, setMessage] = useState(messageInitialState);

  openListener(user.id, messages, setMessage);

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();

    if (!messages.current) {
      return;
    }

    socket!.emit(`MESSAGE_FROM:${user.id}`, messages.current, friend.id);
    setMessage({
      ...messages,
      current: "",
      history: [
        ...messages.history,
        {
          user: user,
          content: messages.current,
        },
      ],
    });
  };

  return (
    <MessagesStyled>
      <div
        data-testid="modal-close"
        className="fa modal-close"
        onClick={() => {
          close(false);
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
          <path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z" />
        </svg>
      </div>
      <div className="modal-container">
        <ul className="messages" key={"messages"}>
          {messages.history.map((message, index) => (
            <li key={index}>
              {message.content && (
                <Message user={message.user} message={message.content} />
              )}
            </li>
          ))}
        </ul>

        <form className="messages__send" onSubmit={handleSubmit}>
          <InputStyled
            type="text"
            value={messages.current}
            onChange={(event) =>
              setMessage({
                ...messages,
                current: event.target.value,
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
