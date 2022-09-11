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

  &.area {
    width: 100%;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.large}) {
    width: 45%;

    &.area {
      width: 95%;
    }
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
  border: 1px solid ${(props) => props.theme.colors.primaryDark};
  width: 100%;
  transition: 0.2s;

  &.drop-area span {
    font-size: 0.8rem;
  }

  & input[type="file"] {
    margin-top: 0.5rem;
    padding: ${({ theme }) => theme.spacing.gapSmall};
    border-radius: ${({ theme }) => theme.shapes.radiusSmall};
    background-color: ${({ theme }) => theme.colors.primaryDarker};
    cursor: pointer;
    max-width: 100%;
    width: 100%;

    &::-webkit-file-upload-button {
      display: none;
    }
  }

  &:focus {
    /* background-color: ${(props) => props.theme.colors.primaryDarker}; */
    border-color: ${(props) => props.theme.colors.secondaryBrigther};
  }

  &.form__input {
    &--user {
      background: linear-gradient(
          to bottom,
          rgba(255, 255, 255, 0.7),
          rgba(255, 255, 255, 0.7)
        ),
        url("/img/user-solid.svg") no-repeat;
    }
    &--password {
      background: linear-gradient(
          to bottom,
          rgba(255, 255, 255, 0.7),
          rgba(255, 255, 255, 0.7)
        ),
        url("/img/lock-solid.svg") no-repeat;
    }

    &--user:hover {
      background: linear-gradient(
          to bottom,
          rgba(255, 255, 255, 0.4),
          rgba(255, 255, 255, 0.4)
        ),
        url("/img/user-solid.svg") no-repeat;
    }
    &--password:hover {
      background: linear-gradient(
          to bottom,
          rgba(255, 255, 255, 0.4),
          rgba(255, 255, 255, 0.4)
        ),
        url("/img/lock-solid.svg") no-repeat;
    }

    &--user,
    &--password {
      background-size: 1.1rem;
      background-position: 0.9rem;
      padding-left: 3rem;
    }

    &--user:focus,
    &--password:focus,
    &--user:hover,
    &--password:hover {
      background-size: 1.4rem;
      background-position: 0.9rem;
      padding-left: 3rem;
    }

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
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.gapSmall};

  @media (min-width: ${({ theme }) => theme.breakpoints.small}) {
    align-items: center;
    flex-direction: row;
  }

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
