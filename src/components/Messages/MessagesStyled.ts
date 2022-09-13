import styled from "styled-components";

const MessagesStyled = styled.div`
  background-color: rgba(0, 0, 0, 0.6);
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  .modal-container {
    position: relative;
    padding: calc(${({ theme }) => theme.spacing.paddingBig} * 1.7)
      ${({ theme }) => theme.spacing.paddingBig};
    border-radius: ${({ theme }) => theme.shapes.radiusBig};
    background-color: ${({ theme }) => theme.colors.primaryDarker};

    min-height: 75vh;
    max-height: 95vh;
    min-width: 50vw;
    max-width: 95vw;
  }

  .messages {
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
`;

export default MessagesStyled;
