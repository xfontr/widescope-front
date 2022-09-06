import { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import routes from "../../configs/routes";
import useToken from "../../hooks/useToken/useToken";

const Validator = ({ children }: PropsWithChildren): JSX.Element => {
  const hasToken = useAppSelector((state) => state.user.user.token);
  const getToken = useToken();

  if (!hasToken) {
    (async () => {
      await getToken();
    })();
  }

  const isLogged = useAppSelector((state) => state.user.isLogged);

  return <>{isLogged ? children : <Navigate to={routes.logIn} />}</>;
};

export default Validator;
