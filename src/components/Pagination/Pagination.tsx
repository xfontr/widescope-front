import Button from "../Button/Button";
import PaginationStyled from "./PaginationStyled";

interface PaginationProps {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination = ({ page, setPage }: PaginationProps): JSX.Element => {
  return (
    <PaginationStyled>
      <Button
        content="«"
        type="button"
        action={() => {
          setPage(page - 1);
        }}
      />
      <div className="pagination__page">{page}</div>
      <Button
        content="»"
        type="button"
        action={() => {
          setPage(page + 1);
        }}
      />
    </PaginationStyled>
  );
};

export default Pagination;
