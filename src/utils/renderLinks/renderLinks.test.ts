import { navRoutes } from "../../configs/routes";
import renderLinks from "./renderLinks";

describe("Given a renderLinks function", () => {
  describe("When called with arguments true and a route", () => {
    test("Then it should return false if the route is set to be skipped", () => {
      const expectedResult = false;

      const utils = renderLinks(true, navRoutes.createProject);

      expect(utils).toBe(expectedResult);
    });

    test("Then it should return false if the route has a display 'never'", () => {
      const expectedResult = false;

      const utils = renderLinks(true, navRoutes.root);

      expect(utils).toBe(expectedResult);
    });

    test("Then it should return true if the route has a display 'always'", () => {
      const expectedResult = true;

      const utils = renderLinks(true, navRoutes.explore);

      expect(utils).toBe(expectedResult);
    });

    test("Then it should return false if the route has a display 'notLogged'", () => {
      const expectedResult = false;

      const utils = renderLinks(true, navRoutes.signUp);

      expect(utils).toBe(expectedResult);
    });

    test("Then it should return true if the route has a display 'logged'", () => {
      const expectedResult = true;

      const utils = renderLinks(true, navRoutes.personalProjects);

      expect(utils).toBe(expectedResult);
    });
  });
});
