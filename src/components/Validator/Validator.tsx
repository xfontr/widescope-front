import { PropsWithChildren, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import routes from "../../configs/routes";

const Validator = ({ children }: PropsWithChildren): JSX.Element => {
  const isLogged = useAppSelector((state) => state.user.isLogged);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogged) {
      navigate(routes.logIn);
    }
  }, [isLogged, navigate]);

  return <>{isLogged && children}</>;
};

export default Validator;
