import styled from "styled-components";

const MessagesStyled = styled.div`
  z-index: 999999;
  background-color: rgba(0, 0, 0, 0.6);
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  .modal-close {
    z-index: 999999;
    position: absolute;
    top: 0;
    width: 60px;
    height: 60px;
    background-color: white;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors.secondary};

    &.fa svg {
      width: 1.7rem;
      fill: ${({ theme }) => theme.colors.primary};
    }
  }

  .modal-container {
    transition: 0.3s;
    animation-name: show-messages;
    animation-duration: 0.6s;
    animation-iteration-count: 1;

    position: relative;
    padding: calc(${({ theme }) => theme.spacing.paddingBig} * 1.7)
      ${({ theme }) => theme.spacing.paddingBig};
    border-radius: ${({ theme }) => theme.shapes.radiusBig};
    background-color: ${({ theme }) => theme.colors.primaryDarker};

    width: 90vw;
    height: 95vh;

    @media (min-width: ${({ theme }) => theme.breakpoints.large}) {
      width: 55vw;
      height: 85vh;
    }
  }

  .messages {
    overflow: hidden;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
    min-height: 65vh;
    max-height: 85vh;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.gapSmall};

    &__send {
      display: flex;
      position: absolute;
      width: 94%;
      background-color: ${({ theme }) => theme.colors.primaryDarker};
      padding: 1.1rem;
      right: calc(${({ theme }) => theme.spacing.paddingBig} * 0.8);
      bottom: calc(${({ theme }) => theme.spacing.paddingBig} * 0.8);
      gap: ${({ theme }) => theme.spacing.gapSmall};
      margin-top: ${({ theme }) => theme.spacing.gapSmall};
    }
  }

  @keyframes show-messages {
    from {
      transform: rotate3d(1, 1, 1, 0deg);
    }

    to {
      transform: rotate3d(20, 2, 10, 360deg);
    }
  }
`;

export default MessagesStyled;
