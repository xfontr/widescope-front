import { useAppSelector } from "../../app/hooks";
import MessageStyled from "./MessageStyled";

interface MessageProps {
  user: string;
  message: string;
  index: number;
}

const Message = ({ user, message, index }: MessageProps): JSX.Element => {
  const { name } = useAppSelector(({ user }) => user.user);

  const modifier = `${user === name ? "user" : "friend"}`;
  const sender = `${user === name ? "You" : user}`;

  return (
    <>
      <MessageStyled key={index}>
        <span className={`message__name message--${modifier}`}>{sender}</span>
        <div className={`message__bubble message--${modifier}`}>{message}</div>
      </MessageStyled>
    </>
  );
};

export default Message;
