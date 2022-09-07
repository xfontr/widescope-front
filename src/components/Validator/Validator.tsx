import { Navigate, Outlet } from "react-router-dom";
import routes from "../../configs/routes";

interface ValidatorProps {
  rejectPath?: string;
  option: boolean;
}

const Validator = ({
  rejectPath = routes.logIn,
  option,
}: ValidatorProps): JSX.Element => {
  return <>{option ? <Outlet /> : <Navigate to={rejectPath} />}</>;
};

export default Validator;
