import { useAppSelector } from "../../app/hooks";
import IContact from "../../types/IContact";
import MessageStyled from "./MessageStyled";

interface MessageProps {
  user: IContact;
  message: string;
}

const Message = ({ user, message }: MessageProps): JSX.Element => {
  const { id } = useAppSelector(({ user }) => user.user);

  const modifier = `${user.id === id ? "user" : "friend"}`;
  const sender = `${user.id === id ? "You" : user.name}`;

  return (
    <MessageStyled>
      <span className={`message__name message--${modifier}`}>{sender}</span>
      <div className={`message__bubble message--${modifier}`}>{message}</div>
    </MessageStyled>
  );
};

export default Message;
