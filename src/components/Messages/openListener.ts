import React from "react";
import socket from "../../sockets";
import { IMessage } from "./Messages";

const openListener = (
  friend: string,
  message: string,
  messages: IMessage,
  setter: React.Dispatch<React.SetStateAction<IMessage>>
) => {
  socket!.on(`MESSAGE_TO:${friend}`, (message: string) => {
    setter({
      ...messages,
      history: [
        ...messages.history,
        {
          user: friend,
          content: message,
        },
      ],
    });
  });
};

export default openListener;
