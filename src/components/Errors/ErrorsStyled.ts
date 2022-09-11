import styled from "styled-components";

const ErrorsStyled = styled.div`
  .error-list {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
    width: 100%;
  }

  .error-message {
    font-size: 0.8rem;
    display: block;
    background-color: ${(props) => props.theme.colors.error};
    padding: ${(props) => props.theme.spacing.paddingSmall};
    border-radius: ${(props) => props.theme.shapes.radiusSmall};
  }
`;

export default ErrorsStyled;
