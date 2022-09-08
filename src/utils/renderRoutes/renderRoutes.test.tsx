import { Route } from "react-router-dom";
import { navRoutes } from "../../configs/routes";
import renderRoutes from "./renderRoutes";
import Validator from "../../components/Validator/Validator";

describe("Given a renderRoutes function", () => {
  describe("When called with arguments true and a route with display 'notLogged'", () => {
    test("Then it should return two routes", () => {
      const isLogged = true;
      const expectedView = (
        <Route
          element={
            <Validator option={!isLogged} rejectPath={navRoutes.explore.path} />
          }
        >
          <Route
            path={navRoutes.signUp.path}
            element={navRoutes.signUp.render!()}
          />
        </Route>
      );

      const view = renderRoutes(isLogged, navRoutes.signUp);

      expect(view).toStrictEqual(expectedView);
    });
  });

  describe("When called with arguments true and a route with display 'logged'", () => {
    test("Then it should return two routes", () => {
      const isLogged = true;
      const expectedView = (
        <Route
          element={
            <Validator option={isLogged} rejectPath={navRoutes.logIn.path} />
          }
        >
          <Route
            path={navRoutes.personalProjects.path}
            element={navRoutes.personalProjects.render!()}
          />
        </Route>
      );

      const view = renderRoutes(isLogged, navRoutes.personalProjects);

      expect(view).toStrictEqual(expectedView);
    });
  });

  describe("When called with arguments true and a route with display 'never' or 'always'", () => {
    test("Then it should render only one route element", () => {
      const isLogged = true;
      const expectedView = (
        <Route path={navRoutes.home.path} element={navRoutes.home.render!()} />
      );

      const view = renderRoutes(isLogged, navRoutes.home);

      expect(view).toStrictEqual(expectedView);
    });
  });

  describe("When called with arguments true and a route that has no render", () => {
    test("Then it should render an empty React fragment", () => {
      const isLogged = true;
      const expectedView = <></>;

      const view = renderRoutes(isLogged, navRoutes.logOut);

      expect(view).toStrictEqual(expectedView);
    });
  });
});
