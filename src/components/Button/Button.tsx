import ButtonStyled from "./ButtonStyled";

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
    if (!action) {
      return;
    }

    event.preventDefault();

    action();
  };

  return (
    <ButtonStyled type={type} onClick={(event) => handleButtonAction(event)}>
      {content}
    </ButtonStyled>
  );
};

export default Button;
