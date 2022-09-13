import React from "react";
import socket from "../../sockets";
import { IMessage } from "./Messages";

const openListener = (
  user: string,
  messages: IMessage,
  setter: React.Dispatch<React.SetStateAction<IMessage>>
) => {
  socket!.on(`MESSAGE_TO:${user}`, (message: string) => {
    setter({
      ...messages,
      history: [
        ...messages.history,
        {
          user: messages.friend,
          content: message,
        },
      ],
    });
  });
};

export default openListener;
