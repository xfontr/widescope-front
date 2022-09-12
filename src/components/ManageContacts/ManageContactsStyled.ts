import styled from "styled-components";

const ManageContactsStyled = styled.div`
  position: fixed;
  z-index: 9999999;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.6);

  display: flex;
  justify-content: center;
  align-items: center;

  .contacts {
    border-radius: ${({ theme }) => theme.shapes.radiusSmall};
    padding: calc(${({ theme }) => theme.spacing.paddingBig} * 2);
    background-color: ${({ theme }) => theme.colors.primary};
    min-height: 40vh;
    min-width: 40vw;

    &__title {
      margin: 0;
      margin-bottom: ${({ theme }) => theme.spacing.gapSmall};
    }
  }
`;

export default ManageContactsStyled;
