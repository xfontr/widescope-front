import { useAppSelector } from "../../app/hooks";
import Button from "../Button/Button";
import PaginationStyled from "./PaginationStyled";

interface PaginationProps {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination = ({ page, setPage }: PaginationProps): JSX.Element => {
  const total = useAppSelector((state) => state.projects.length);
  const lastPage = total < 10 ? page : page + 1;

  const minPage = page - 1 <= 0 ? 0 : page - 1;
  const maxPage = page >= lastPage ? page : page + 1;

  return (
    <PaginationStyled>
      <Button
        content="«"
        type="button"
        action={() => {
          setPage(minPage);
        }}
      />
      <div className="pagination__page">{page + 1}</div>
      <Button
        content="»"
        type="button"
        action={() => {
          setPage(maxPage);
        }}
      />
    </PaginationStyled>
  );
};

export default Pagination;
