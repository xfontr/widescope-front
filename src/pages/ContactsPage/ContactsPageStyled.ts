import styled from "styled-components";

const ContactsPageStyled = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: ${({ theme }) => theme.breakpoints.large}) {
    h2 {
      width: 100%;
      max-width: 100%;
      padding-right: 70%;
    }

    flex-direction: row;
    flex-wrap: wrap;
  }

  .search-bar__container {
    max-width: 100%;

    @media (min-width: ${({ theme }) => theme.breakpoints.large}) {
      width: 30%;
      height: 30%;
      gap: 0.3rem;
      position: sticky;
      top: 5rem;
    }
  }

  .friends {
    @media (min-width: ${({ theme }) => theme.breakpoints.large}) {
      width: 64%;
      margin-left: 3%;
      padding: 3%;
      background-color: ${({ theme }) => theme.colors.primary};
      border-radius: ${({ theme }) => theme.shapes.radiusSmall};

      justify-content: flex-start;
      & > h3 {
        color: ${({ theme }) => theme.colors.secondaryBrigther};
        font-size: 1.5rem;
        margin: 0 0 1rem 0;
      }
    }
  }
`;

export default ContactsPageStyled;
