interface MessageProps {
  user: string;
  message: string;
  index: number;
}

const Message = ({ user, message, index }: MessageProps): JSX.Element => (
  <>
    <li className="message" key={index}>
      <span className="message__name">{user}</span>
      <div className="message__bubble">{message}</div>
    </li>
  </>
);

export default Message;
