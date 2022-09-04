import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import routes from "../../configs/routes";
import useUser from "../../hooks/useUser/useUser";
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
              <li className="navigation__link">
                <Link
                  to={routes.root}
                  className="navigation__link"
                  onClick={toggleVisiblity}
                >
                  Home
                </Link>
              </li>

              <li className="navigation__link">
                <Link
                  to={routes.explore}
                  className="navigation__link"
                  onClick={toggleVisiblity}
                >
                  Explore
                </Link>
              </li>

              <li className="navigation__link">
                <Link
                  to={routes.signUp}
                  className="navigation__link"
                  onClick={toggleVisiblity}
                >
                  Sign up
                </Link>
              </li>

              {!isLogged && (
                <li className="navigation__link">
                  <Link
                    to={routes.logIn}
                    className="navigation__link"
                    onClick={toggleVisiblity}
                  >
                    Log in
                  </Link>
                </li>
              )}

              {isLogged && (
                <li className="navigation__link">
                  <Link
                    to={routes.logIn}
                    className="navigation__link"
                    onClick={() => {
                      logOut();
                      toggleVisiblity();
                    }}
                  >
                    Log out
                  </Link>
                </li>
              )}
            </ul>

            {isLogged && (
              <Button
                type="button"
                content="Post a project"
                action={() => {
                  navigate(routes.createProject);
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
