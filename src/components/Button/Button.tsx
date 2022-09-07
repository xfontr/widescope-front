import ButtonStyled from "./ButtonStyled";

type ButtonTypes = "submit" | "button" | "link";
type ButtonStyles = "default" | "outline" | "pagination";

interface ButtonProps {
  content: string;
  action?: () => void;
  type: ButtonTypes;
  customStyle?: ButtonStyles;
  link?: string;
}

const Button = ({
  content,
  action,
  type,
  customStyle = "default",
  link,
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
    <>
      {type !== "link" && (
        <ButtonStyled
          type={type}
          onClick={(event) => handleButtonAction(event)}
          className={`button--${customStyle}`}
        >
          {content}
        </ButtonStyled>
      )}
      {type === "link" && (
        <ButtonStyled
          as={"a"}
          className={`button--${customStyle}`}
          href={link}
          target="_blank"
          rel="noreferrer"
        >
          {content}
        </ButtonStyled>
      )}
    </>
  );
};

export default Button;
