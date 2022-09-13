import React, { useState } from "react";
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

  const handleSubmit = (event: any) => {
    event.preventDefault();

    if (!messages.current) {
      return;
    }

    socket!.emit(`MESSAGE_FROM:${user.id}`, messages.current, friend.id);
    setMessage({
      ...messages,
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
        className="modal-close"
        onClick={() => {
          close(false);
        }}
      ></div>
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
