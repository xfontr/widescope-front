import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import { navRoutes } from "../../configs/routes";

const NotFoundPage = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <>
      <h2 className="page__title page__title--wide">
        Oops! We couldn't find what you are
        <span className="page__title--bold"> looking for</span>
      </h2>
      <span className="page__title-subheading">
        But hey, what about exploring some of our projects?
      </span>
      <Button
        children="Explore"
        type="button"
        action={() => {
          navigate(navRoutes.explore.path);
        }}
      />
    </>
  );
};

export default NotFoundPage;
