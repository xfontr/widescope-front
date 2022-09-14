import styled from "styled-components";

const MessageStyled = styled.div`
  width: 100%;

  .message {
    &--user {
      text-align: right;
    }

    &--friend {
      text-align: left;
    }

    &__name {
      display: block;
    }

    &__bubble {
      background-color: ${({ theme }) => theme.colors.primary};
      padding: ${({ theme }) => theme.spacing.paddingSmall};
      border-radius: ${({ theme }) => theme.shapes.radiusSmall};
    }
  }
`;

export default MessageStyled;
