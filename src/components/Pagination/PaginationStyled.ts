import styled from "styled-components";

const PaginationStyled = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.gapSmall};
  justify-content: center;
  align-items: center;
  min-height: 7rem;

  .pagination__page {
    padding: ${(props) => props.theme.shapes.rectangularContainer};
    border-radius: ${(props) => props.theme.shapes.radiusSmall};
    background-color: ${(props) => props.theme.colors.secondary};
    color: ${(props) => props.theme.colors.primary};
    border: 1px solid transparent;
    width: fit-content;
    display: inline-block;
    font-weight: bold;
  }
`;

export default PaginationStyled;
