import AppStyled from "./AppStyled";
import { Navigate, Route, Routes } from "react-router-dom";
import SignUpPage from "../../pages/SignUpPage/SignUpPage";
import LogInPage from "../../pages/LogInPage/LogInPage";
import NavigationMenu from "../NavigationMenu/NavigationMenu";
import Modal from "../Modal/Modal";
import { useEffect } from "react";
import useToken from "../../hooks/useToken/useToken";
import routes from "../../configs/routes";

const App = (): JSX.Element => {
  const getToken = useToken();

  useEffect(() => {
    getToken();
  }, [getToken]);

  return (
    <AppStyled>
      <Modal />
      <header className="header">
        <h3>wideScope</h3>
        <NavigationMenu />
      </header>
      <main>
        <Routes>
          <Route path={routes.root} element={<Navigate to={routes.home} />} />
          <Route path={routes.home} element={<LogInPage />} />
          <Route path={routes.signUp} element={<SignUpPage />} />
          <Route path={routes.logIn} element={<LogInPage />} />
        </Routes>
      </main>
      <footer className="footer">wideScope © 2022</footer>
    </AppStyled>
  );
};

export default App;
