import styled from "styled-components";

export const SignFormStyled = styled.form`
  display: flex;
  flex-direction: column;

  gap: ${(props) => props.theme.spacing.gapBig};
  padding: ${(props) => props.theme.spacing.paddingBig};
  border-radius: ${(props) => props.theme.shapes.radiusSmall};
  background-color: ${(props) => props.theme.colors.primary};
`;

export const HeaderStyled = styled.header`
  margin-bottom: 0.5rem;

  & .form__heading {
    margin: 0 0 0.3rem 0;
    font-size: 1.6rem;
  }

  & .form__cta-text {
    color: ${(props) => props.theme.colors.secondaryBrigther};
  }
`;

export const GroupStyled = styled.div`
  & * {
    display: block;
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

  &.form__input--error {
    background-color: ${(props) => props.theme.colors.error};
  }
`;

export const FooterStyled = styled.footer`
  display: flex;
  gap: ${(props) => props.theme.spacing.gapBig};

  & .form__sign-up-cta {
    width: 50%;
    color: ${(props) => props.theme.colors.secondaryBrigther};
  }
`;
