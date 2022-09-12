import { Navigate, Outlet } from "react-router-dom";
import { navRoutes } from "../../configs/routes";

interface ValidatorProps {
  rejectPath?: string;
  option: boolean;
}

const Validator = ({
  rejectPath = navRoutes.logIn.path,
  option,
}: ValidatorProps): JSX.Element => (
  <>{option ? <Outlet /> : <Navigate to={rejectPath} />}</>
);

export default Validator;
