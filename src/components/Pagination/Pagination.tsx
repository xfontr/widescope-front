import { useAppSelector } from "../../app/hooks";
import Button from "../Button/Button";
import PaginationStyled from "./PaginationStyled";

interface PaginationProps {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const minPage = (page: number) => (page < 1 ? 1 : page);
const maxPage = (page: number, total: number) => (page > total ? total : page);

const Pagination = ({ page, setPage }: PaginationProps): JSX.Element => {
  const total = useAppSelector((state) =>
    state.projects.length < 10 ? page : page + 1
  );

  return (
    <PaginationStyled>
      <Button
        content="«"
        type="button"
        action={() => {
          setPage(minPage(page) - 1);
        }}
      />
      <div className="pagination__page">{page + 1}</div>
      <Button
        content="»"
        type="button"
        action={() => {
          setPage(maxPage(page + 1, total));
        }}
      />
    </PaginationStyled>
  );
};

export default Pagination;
