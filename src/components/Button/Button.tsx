import ButtonStyled from "./ButtonStyled";

type ButtonTypes = "submit" | "button";

interface ButtonProps {
  content: string;
  action?: () => void;
  type: ButtonTypes;
  customStyle?: "default" | "outline";
}

const Button = ({
  content,
  action,
  type,
  customStyle = "default",
}: ButtonProps): JSX.Element => {
  const handleButtonAction = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (!action) {
      return;
    }

    event.preventDefault();

    action();
  };

  return (
    <ButtonStyled
      type={type}
      onClick={(event) => handleButtonAction(event)}
      className={`button--${customStyle}`}
    >
      {content}
    </ButtonStyled>
  );
};

export default Button;
