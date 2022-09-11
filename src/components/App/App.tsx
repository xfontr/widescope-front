import AppStyled from "./AppStyled";
import NavigationMenu from "../NavigationMenu/NavigationMenu";
import Modal from "../Modal/Modal";
import { navRoutes } from "../../configs/routes";
import { useAppSelector } from "../../app/hooks";
import { Link, Routes } from "react-router-dom";
import useToken from "../../hooks/useToken/useToken";
import { useEffect } from "react";
import renderRoutes from "../../utils/renderRoutes/renderRoutes";

const App = (): JSX.Element => {
  const isLogged = useAppSelector((state) => state.user.isLogged);
  const verifyUser = useToken();

  useEffect(() => {
    (async () => {
      await verifyUser();
    })();
  }, [verifyUser]);

  return (
    <AppStyled>
      <Modal />

      <header className="header">
        <Link to="/">
          <h1 className="header__title">wideScope</h1>
        </Link>
        <NavigationMenu />
      </header>

      <main>
        <Routes key="routes">
          {Object.values(navRoutes).map((route) =>
            renderRoutes(isLogged, route)
          )}
        </Routes>
      </main>

      <footer className="footer">
        <span className="footer__copyright">wideScope © 2022</span>
      </footer>
    </AppStyled>
  );
};

export default App;
