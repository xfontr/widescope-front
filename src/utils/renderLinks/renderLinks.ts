import { NavRoute } from "../../configs/routes";

const renderLinks = (isLogged: boolean, route: NavRoute) => {
  if (route.skip) {
    return false;
  }

  switch (route.display) {
    case "never":
      return false;

    case "always":
      return true;

    case "notLogged":
      return isLogged ? false : true;

    case "logged":
      return isLogged ? true : false;
  }
};

export default renderLinks;
