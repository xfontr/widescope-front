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

  if (page === 0 && total < 10) {
    return <></>;
  }

  return (
    <PaginationStyled>
      <Button
        children="«"
        type="button"
        disabled={minPage === page}
        action={() => {
          setPage(minPage);
          window.scrollTo(0, 0);
        }}
      />

      <Button
        children={page}
        type="button"
        disabled={minPage === page}
        action={() => {
          setPage(page - 1);
          window.scrollTo(0, 0);
        }}
      />

      <div className="pagination__page">{page + 1}</div>

      <Button
        children={page + 2}
        type="button"
        disabled={maxPage === page}
        action={() => {
          setPage(page + 1);
          window.scrollTo(0, 0);
        }}
      />

      <Button
        children="»"
        type="button"
        disabled={maxPage === page}
        action={() => {
          setPage(maxPage);
          window.scrollTo(0, 0);
        }}
      />
    </PaginationStyled>
  );
};

export default Pagination;
