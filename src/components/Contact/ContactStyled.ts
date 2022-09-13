import styled from "styled-components";

const ContactStyled = styled.article`
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  padding: ${({ theme }) => theme.spacing.paddingSmall} 2rem;
  border-radius: ${({ theme }) => theme.shapes.radiusSmall};
`;

export default ContactStyled;
