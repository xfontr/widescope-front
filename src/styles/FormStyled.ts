import styled from "styled-components";

export const SignFormStyled = styled.form`
  display: flex;
  flex-direction: column;

  gap: ${(props) => props.theme.spacing.gapBig};
  padding: ${(props) => props.theme.spacing.paddingBig};
  border-radius: ${(props) => props.theme.shapes.radiusSmall};
  background-color: ${(props) => props.theme.colors.primary};

  max-width: 33rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.large}) {
    max-width: 80%;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-end;
  }
`;

export const HeaderStyled = styled.header`
  margin-bottom: 0.5rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.large}) {
    width: 100%;
  }

  .form {
    &__heading {
      margin: 0 0 0.3rem 0;
      font-size: 1.6rem;
    }

    &__cta-text {
      color: ${(props) => props.theme.colors.secondaryBrigther};
    }
  }
`;

export const GroupStyled = styled.div`
  & * {
    display: block;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.large}) {
    width: 45%;
  }
`;

export const LabelStyled = styled.label`
  font-size: 1.1rem;
  margin-bottom: 0.3rem;
`;

export const InputStyled = styled.input`
  font-size: 1.1rem;
  padding: ${(props) => props.theme.shapes.rectangularContainer};
  padding-left: 0.8rem;
  border-radius: ${(props) => props.theme.shapes.radiusSmall};
  background-color: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.secondary};
  border: 1px solid ${(props) => props.theme.colors.secondary};
  width: 100%;
  transition: 0.2s;

  &:focus {
    background-color: ${(props) => props.theme.colors.primaryDarker};
  }

  &.form__input {
    &--error-repeat {
      background-color: ${(props) => props.theme.colors.error};
    }

    &--error {
      border-color: ${(props) => props.theme.colors.error};
      border-width: 2px;
    }
  }
`;

export const FooterStyled = styled.footer`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.gapSmall};

  @media (min-width: ${({ theme }) => theme.breakpoints.large}) {
    width: 100%;
  }

  & .form__sign-up-cta {
    display: block;
    max-width: 12rem;
    color: ${(props) => props.theme.colors.secondaryBrigther};
    line-height: 1.1rem;

    a {
      font-weight: bold;
    }
  }
`;
