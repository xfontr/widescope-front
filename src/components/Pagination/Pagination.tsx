import Button from "../Button/Button";

interface PaginationProps {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination = ({ page, setPage }: PaginationProps): JSX.Element => {
  return (
    <div className="pagination">
      <Button
        content="«"
        type="button"
        customStyle="pagination"
        action={() => {
          setPage(page - 1);
        }}
      />
      <div className="pagination__page">{page}</div>
      <Button
        content="»"
        type="button"
        customStyle="pagination"
        action={() => {
          setPage(page + 1);
        }}
      />
    </div>
  );
};

export default Pagination;
