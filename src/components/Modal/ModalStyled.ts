import styled from "styled-components";

const ModalStyled = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9999999;

  display: flex;
  justify-content: center;
  align-items: center;

  min-height: 8.5rem;
  box-shadow: ${(props) => props.theme.shapes.longShadow};
  background-color: ${(props) => props.theme.colors.primary};

  & .modal__content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  & .modal__message {
    display: block;
    margin-top: 0.6rem;

    &--loading {
      color: inherit;
    }

    &--error {
      color: ${(props) => props.theme.colors.error};
    }

    &--success {
      color: ${(props) => props.theme.colors.success};
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
