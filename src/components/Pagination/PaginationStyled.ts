import styled from "styled-components";

const PaginationStyled = styled.div`
  display: flex;
  gap: calc(${({ theme }) => theme.spacing.gapSmall} - 1rem);
  justify-content: center;
  align-items: center;
  min-height: 7rem;

  .pagination__page {
    padding: ${({ theme }) => theme.shapes.rectangularContainer};
    border-radius: ${({ theme }) => theme.shapes.radiusSmall};
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.secondary};
    border: 1px solid ${({ theme }) => theme.colors.secondary};
    width: fit-content;
    display: inline-block;
    font-weight: bold;
  }
`;

export default PaginationStyled;
