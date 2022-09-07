import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import routes from "../../configs/routes";

interface ValidatorProps {
  children: JSX.Element | JSX.Element[];
  isReverse?: boolean;
}

const Validator = ({
  children,
  isReverse = false,
}: ValidatorProps): JSX.Element => {
  const isLogged = useAppSelector((state) => state.user.isLogged);

  return (
    <>
      {!isReverse && isLogged ? children : <Navigate to={routes.logIn} />}
      {isReverse && !isLogged ? children : <Navigate to={routes.explore} />}
    </>
  );
};

export default Validator;
