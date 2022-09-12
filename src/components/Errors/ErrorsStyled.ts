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
    background-color: ${({ theme }) => theme.colors.errorBrighter};
    border: 1px solid ${({ theme }) => theme.colors.error};
    padding: 0.4rem 1.5rem;
    border-radius: ${({ theme }) => theme.shapes.radiusSmall};
  }
`;

export default ErrorsStyled;
