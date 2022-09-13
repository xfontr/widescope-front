import styled from "styled-components";

const MessagesStyled = styled.div`
  .messages {
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.gapSmall};

    &__send {
      display: flex;
      gap: ${({ theme }) => theme.spacing.gapSmall};
      margin-top: ${({ theme }) => theme.spacing.gapSmall};
    }
  }
`;

export default MessagesStyled;
