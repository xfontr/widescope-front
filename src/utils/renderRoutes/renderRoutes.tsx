import { Route } from "react-router-dom";
import Validator from "../../components/Validator/Validator";
import { NavRoute, navRoutes } from "../../configs/routes";

const renderRoutes = (
  isLogged: boolean,
  route: NavRoute
): JSX.Element | undefined => {
  const element = route.render && route.render();

  if (!element) {
    return undefined;
  }

  switch (route.display) {
    case "notLogged":
      return (
        <Route
          key={`validator${route.path}`}
          element={
            <Validator
              key={`val${route.path}`}
              option={!isLogged}
              rejectPath={navRoutes.explore.path}
            />
          }
        >
          <Route key={route.path} path={route.path} element={element} />
        </Route>
      );

    case "logged":
      return (
        <Route
          key={`validator${route.path}`}
          element={
            <Validator
              key={`val${route.path}`}
              option={isLogged}
              rejectPath={navRoutes.logIn.path}
            />
          }
        >
          <Route key={route.path} path={route.path} element={element} />
        </Route>
      );

    default:
      return <Route key={route.path} path={route.path} element={element} />;
  }
};

export default renderRoutes;
