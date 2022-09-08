import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { navRoutes } from "../../configs/routes";
import useUser from "../../hooks/useUser/useUser";
import renderLinks from "../../utils/renderLinks/renderLinks";
import Button from "../Button/Button";
import NavigationStyled from "./NavigationMenuStyled";

const NavigationMenu = (): JSX.Element => {
  const [isMenuVisible, setVisibility] = useState(false);
  const { logOut } = useUser();
  const isLogged = useAppSelector((state: RootState) => state.user.isLogged);
  const navigate = useNavigate();

  const toggleVisiblity = () => {
    setVisibility(!isMenuVisible);
  };

  return (
    <NavigationStyled>
      <div
        data-testid="burger-icon"
        className="burger-icon"
        onClick={toggleVisiblity}
      >
        <div
          className={`burger-line ${
            isMenuVisible ? "burger-line--crossed" : ""
          }`}
        ></div>
      </div>

      {isMenuVisible && (
        <div className="modal-cover">
          <div
            data-testid="modal-close-area"
            className="modal-close-area"
            onClick={toggleVisiblity}
          ></div>

          <section className={"navigation navigation--in"}>
            <ul className="navigation__links">
              {Object.values(navRoutes).map(
                (route) =>
                  renderLinks(isLogged, route) && (
                    <li className="navigation__link">
                      <Link
                        to={route.path}
                        className="navigation__link"
                        onClick={() => {
                          toggleVisiblity();
                          route.action && route.action(logOut);
                        }}
                      >
                        {route.name}
                      </Link>
                    </li>
                  )
              )}
            </ul>

            {isLogged && (
              <Button
                type="button"
                content="Post a project"
                action={() => {
                  navigate("/project/new");
                  toggleVisiblity();
                }}
              />
            )}
          </section>
        </div>
      )}
    </NavigationStyled>
  );
};

export default NavigationMenu;
