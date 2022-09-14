import styled from "styled-components";

const ModalStyled = styled.div`
  position: fixed;
  right: calc(50vw - (10rem / 2));
  top: 1rem;
  z-index: 99999;

  display: flex;
  justify-content: center;
  align-items: center;

  height: 10rem;
  width: 10rem;
  border-radius: ${({ theme }) => theme.shapes.radiusSmall};
  box-shadow: ${({ theme }) => theme.shapes.longShadow};
  background-color: ${({ theme }) => theme.colors.primary};

  & .modal__content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  & .modal__message {
    display: block;
    margin-top: 0.6rem;
    text-align: center;

    &--loading {
      color: inherit;
    }

    &--error {
      color: ${({ theme }) => theme.colors.error};
    }

    &--success {
      color: ${({ theme }) => theme.colors.success};
    }
  }

  & .clock {
    position: relative;
    border-radius: 50%;
    border: 1px solid black;
    width: 60px;
    height: 60px;
    transition: 4s;
    animation-name: rotate-watch;
    animation-duration: 4s;
    animation-iteration-count: infinite;
  }

  @keyframes rotate-watch {
    from {
      opacity: 100%;
      border-width: 5px;
      transform: rotateY(0deg);
    }

    50% {
      opacity: 70%;
      border-width: 15px;
      border-style: double;
      transform: rotateY(900deg);
    }

    to {
      opacity: 90%;
      border-width: 5px;
      transform: rotateY(360deg);
    }
  }
`;

export default ModalStyled;
