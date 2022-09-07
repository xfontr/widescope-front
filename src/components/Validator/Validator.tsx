import { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import routes from "../../configs/routes";

const Validator = ({ children }: PropsWithChildren): JSX.Element => {
  const isLogged = useAppSelector((state) => state.user.isLogged);

  return <>{isLogged ? children : <Navigate to={routes.logIn} />}</>;
};

export default Validator;
