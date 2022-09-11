import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { navRoutes } from "../../configs/routes";

interface ValidatorProps {
  rejectPath?: string;
  option: boolean;
}

const Validator = React.memo(
  ({
    rejectPath = navRoutes.logIn.path,
    option,
  }: ValidatorProps): JSX.Element => {
    return <>{option ? <Outlet /> : <Navigate to={rejectPath} />}</>;
  }
);

export default Validator;
