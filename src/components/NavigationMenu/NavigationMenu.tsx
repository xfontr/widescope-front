import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import "./NavigationMenu.css";

const NavigationMenu = (): JSX.Element => {
  const [isMenuVisible, setVisibility] = useState(false);

  const toggleVisiblity = () => {
    setVisibility(!isMenuVisible);
  };

  return (
    <nav>
      <div
        data-testId="burger-icon"
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
            data-testId="modal-close-area"
            className="modal-close-area"
            onClick={toggleVisiblity}
          ></div>
          <section
            className={`navigation ${
              isMenuVisible ? "navigation--in" : "navigation--out"
            }`}
          >
            <ul className="navigation__links">
              <li className="navigation__link">
                <Link to={"/"} />
              </li>

              <li className="navigation__link">
                <Link to={"/"} />
              </li>

              <li className="navigation__link">
                <Link to={"/"} />
              </li>

              <li className="navigation__link">
                <Link to={"/"} />
              </li>

              <li className="navigation__link">
                <Link to={"/"} />
              </li>
            </ul>

            <Button type="button" content="Post a project" />
          </section>
        </div>
      )}
    </nav>
  );
};

export default NavigationMenu;
