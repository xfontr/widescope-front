import styled from "styled-components";

const ButtonStyled = styled.button`
  padding: ${({ theme }) => theme.shapes.rectangularContainer};
  border-radius: ${({ theme }) => theme.shapes.radiusSmall};
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.primary};
  border: 1px solid transparent;
  width: fit-content;
  display: inline-block;

  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;
  user-select: none;

  .fa svg {
    margin-top: 0.2rem;
    width: 1.2rem;
    height: 1.2rem;
    fill: ${({ theme }) => theme.colors.primary};
  }

  &:hover {
    box-shadow: ${({ theme }) => theme.shapes.shortShadow};
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.secondary};
    border: 1px solid ${({ theme }) => theme.colors.secondary};

    .fa svg {
      width: 1.4rem;
      fill: ${({ theme }) => theme.colors.secondary};
    }
  }

  &:active {
    transform: scale(0.95);
  }

  &.button--outline {
    font-weight: normal;
    background-color: transparent;
    color: ${({ theme }) => theme.colors.secondary};
    border: 1px solid ${({ theme }) => theme.colors.secondary};

    &:hover {
      background-color: ${({ theme }) => theme.colors.secondary};
      color: ${({ theme }) => theme.colors.primary};
      border: 1px solid transparent;
    }
  }

  &.button--outline-invert {
    font-weight: normal;
    background-color: transparent;
    color: ${({ theme }) => theme.colors.primary};
    border: 1px solid ${({ theme }) => theme.colors.primary};

    &:hover {
      background-color: ${({ theme }) => theme.colors.primary};
      color: ${({ theme }) => theme.colors.secondary};
      border: 1px solid transparent;
    }
  }

  &.button--disabled {
    opacity: 50%;
    pointer-events: none;
  }

  &.button--default-icon {
    height: 3rem;
    width: 3rem;
    padding: 0;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &.button--icon {
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 0.5rem 1.4rem;

    .fa svg {
      width: 1.5rem;
      height: 1.5rem;
    }
  }
`;

export default ButtonStyled;
