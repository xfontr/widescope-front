import styled from "styled-components";

const ContactStyled = styled.article`
  background-color: ${({ theme }) => theme.colors.primary};
  width: 100%;
  padding: ${({ theme }) => theme.spacing.paddingSmall};
  border-radius: ${({ theme }) => theme.shapes.radiusSmall};
`;

export default ContactStyled;
