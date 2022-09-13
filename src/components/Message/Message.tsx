import MessageStyled from "./MessageStyled";

interface MessageProps {
  user: string;
  message: string;
  index: number;
}

const Message = ({ user, message, index }: MessageProps): JSX.Element => {
  const modifier = `${user === "You" ? "user" : "friend"}`;

  return (
    <>
      <MessageStyled key={index}>
        <span className={`message__name message--${modifier}`}>{user}</span>
        <div className={`message__bubble message--${modifier}`}>{message}</div>
      </MessageStyled>
    </>
  );
};

export default Message;
