import styled from "styled-components";

const ContactsStyled = styled.ul`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.gapBig};
  justify-content: space-between;

  & .contact {
    width: 100%;

    @media (min-width: ${({ theme }) => theme.breakpoints.large}) {
      width: 45%;
    }
    h3 {
      margin: 0;
    }

    article {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: ${({ theme }) => theme.spacing.paddingBig};

      @media (min-width: ${({ theme }) => theme.breakpoints.large}) {
        flex-direction: column;
        align-items: flex-start;
        gap: calc(${({ theme }) => theme.spacing.gapSmall} * 0.5);
        padding: calc(${({ theme }) => theme.spacing.gapSmall} * 0.5);
      }
    }
  }
`;

export default ContactsStyled;
