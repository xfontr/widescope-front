import socket from "../../sockets";

const openListener = (
  friend: string,
  message: string,
  messages: any,
  setter: any
) => {
  socket!.on(`MESSAGE_TO:${friend}`, (message: string) => {
    setter({
      ...messages,
      history: [
        ...messages.history,
        {
          isUser: false,
          content: message,
        },
      ],
    });
  });
};

export default openListener;
