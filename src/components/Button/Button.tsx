type ButtonTypes = "submit" | "button";

interface ButtonProps {
  content: string;
  action?: () => void;
  type: ButtonTypes;
}

const Button = ({ content, action, type }: ButtonProps): JSX.Element => {
  const handleButtonAction = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();

    if (action) {
      action();
    }
  };

  return (
    <button type={type} onClick={(event) => handleButtonAction(event)}>
      {content}
    </button>
  );
};

export default Button;
