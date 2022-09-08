import { Route } from "react-router-dom";
import Validator from "../../components/Validator/Validator";
import { NavRoute, navRoutes } from "../../configs/routes";

const renderRoutes = (isLogged: boolean, route: NavRoute): JSX.Element => {
  const element = route.render && route.render();

  if (!element) {
    return <></>;
  }

  switch (route.display) {
    case "notLogged":
      return (
        <Route
          element={
            <Validator option={!isLogged} rejectPath={navRoutes.explore.path} />
          }
        >
          <Route path={route.path} element={element} />
        </Route>
      );

    case "logged":
      return (
        <Route
          element={
            <Validator option={isLogged} rejectPath={navRoutes.logIn.path} />
          }
        >
          <Route path={route.path} element={element} />
        </Route>
      );

    default:
      return <Route path={route.path} element={element} />;
  }
};

export default renderRoutes;
