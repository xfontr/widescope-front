import { ButtonHTMLAttributes, ReactNode, SyntheticEvent } from "react";
import ButtonStyled from "./ButtonStyled";

type ButtonStyles =
  | "default"
  | "outline-invert"
  | "outline"
  | "default-icon"
  | "icon";

interface ButtonProps extends ButtonHTMLAttributes<unknown> {
  children: ReactNode;
  renderAs?: "button" | "a";
  action?: () => void;
  customStyle?: ButtonStyles;
  link?: string;
}

const Button = ({
  children,
  renderAs,
  action,
  customStyle = "default",
  link,
  ...props
}: ButtonProps): JSX.Element => {
  const handleButtonAction = (event: SyntheticEvent) => {
    action && event.preventDefault();
    action && action();
  };

  return (
    <ButtonStyled
      as={renderAs}
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleButtonAction}
      className={`${
        props["disabled"] && "button--disabled"
      } button--${customStyle} `}
      {...props}
    >
      {children}
    </ButtonStyled>
  );
};

export default Button;
