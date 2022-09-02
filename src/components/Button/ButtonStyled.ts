import styled from "styled-components";

const ButtonStyled = styled.button`
  padding: ${(props) => props.theme.shapes.rectangularContainer};
  border-radius: ${(props) => props.theme.shapes.radiusSmall};
  background-color: ${(props) => props.theme.colors.secondary};
  color: ${(props) => props.theme.colors.primary};
  border: 1px solid transparent;
  width: fit-content;

  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    box-shadow: ${(props) => props.theme.shapes.shortShadow};
    background-color: ${(props) => props.theme.colors.primary};
    color: ${(props) => props.theme.colors.secondary};
    border: 1px solid ${(props) => props.theme.colors.secondary};
  }

  &:active {
    transform: scale(0.95);
  }

  &.button--outline {
    font-weight: normal;
    background-color: ${(props) => props.theme.colors.primary};
    color: ${(props) => props.theme.colors.secondary};
    border: 1px solid ${(props) => props.theme.colors.secondary};
  }

  &.button--outline:hover {
    background-color: ${(props) => props.theme.colors.secondary};
    color: ${(props) => props.theme.colors.primary};
    border: 1px solid transparent;
  }
`;

export default ButtonStyled;
