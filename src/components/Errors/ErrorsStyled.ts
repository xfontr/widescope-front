import styled from "styled-components";

const ErrorsStyled = styled.div`
  .error-list {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
    width: 100%;
  }

  .error-message {
    font-size: 0.9rem;
    display: block;
    background-color: ${(props) => props.theme.colors.errorBrighter};
    border: 1px solid ${(props) => props.theme.colors.error};
    padding: 0.4rem 1.5rem;
    border-radius: ${(props) => props.theme.shapes.radiusSmall};
  }
`;

export default ErrorsStyled;
