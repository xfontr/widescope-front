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
          key={`validator${navRoutes.signUp.path}`}
          element={
            <Validator
              key={`val${navRoutes.signUp.path}`}
              option={!isLogged}
              rejectPath={navRoutes.explore.path}
            />
          }
        >
          <Route
            key={navRoutes.signUp.path}
            path={navRoutes.signUp.path}
            element={navRoutes.signUp.render!()}
          />
        </Route>
      );

      const view = renderRoutes(isLogged, navRoutes.signUp);

      expect(JSON.stringify(view)).toBe(JSON.stringify(expectedView));
    });
  });

  describe("When called with arguments true and a route with display 'logged'", () => {
    test("Then it should return two routes", () => {
      const isLogged = true;
      const expectedView = (
        <Route
          key={`validator${navRoutes.personalProjects.path}`}
          element={
            <Validator
              key={`val${navRoutes.personalProjects.path}`}
              option={isLogged}
              rejectPath={navRoutes.logIn.path}
            />
          }
        >
          <Route
            key={navRoutes.personalProjects.path}
            path={navRoutes.personalProjects.path}
            element={navRoutes.personalProjects.render!()}
          />
        </Route>
      );

      const view = renderRoutes(isLogged, navRoutes.personalProjects);

      expect(JSON.stringify(view)).toBe(JSON.stringify(expectedView));
    });
  });

  describe("When called with arguments true and a route with display 'never' or 'always'", () => {
    test("Then it should render only one route element", () => {
      const isLogged = true;
      const expectedView = (
        <Route
          key={navRoutes.home.path}
          path={navRoutes.home.path}
          element={navRoutes.home.render!()}
        />
      );

      const view = renderRoutes(isLogged, navRoutes.home);

      expect(JSON.stringify(view)).toBe(JSON.stringify(expectedView));
    });
  });

  describe("When called with arguments true and a route that has no render", () => {
    test("Then it should render an empty React fragment", () => {
      const isLogged = true;

      const view = renderRoutes(isLogged, navRoutes.logOut);

      expect(view).toBeUndefined();
    });
  });
});
