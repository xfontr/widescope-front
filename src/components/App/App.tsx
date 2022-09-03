import AppStyled from "./AppStyled";
import { Navigate, Route, Routes } from "react-router-dom";
import SignUpPage from "../../pages/SignUpPage/SignUpPage";
import LogInPage from "../../pages/LogInPage/LogInPage";
import NavigationMenu from "../NavigationMenu/NavigationMenu";
import Modal from "../Modal/Modal";
import { useEffect } from "react";
import useToken from "../../hooks/useToken/useToken";
import routes from "../../configs/routes";
import ExplorePage from "../../pages/ExplorePage/ExplorePage";
import ProjectDetailsPage from "../../pages/ProjectDetailsPage/ProjectDetailsPage";
import CreateProjectPage from "../../pages/CreateProjectPage/CreateProjectPage";

const App = (): JSX.Element => {
  const getToken = useToken();

  useEffect(() => {
    getToken();
  }, [getToken]);

  return (
    <AppStyled>
      <Modal />
      <header className="header">
        <h1>wideScope</h1>
        <NavigationMenu />
      </header>
      <main>
        <Routes>
          <Route path={routes.root} element={<Navigate to={routes.home} />} />
          <Route path={routes.home} element={<LogInPage />} />
          <Route path={routes.signUp} element={<SignUpPage />} />
          <Route path={routes.logIn} element={<LogInPage />} />
          <Route path={routes.logIn} element={<LogInPage />} />
          <Route path={routes.explore} element={<ExplorePage />} />
          <Route path={routes.createProject} element={<CreateProjectPage />} />
          <Route
            path={routes.projectDetails}
            element={<ProjectDetailsPage />}
          />
        </Routes>
      </main>
      <footer className="footer">
        <span className="footer__copyright">wideScope © 2022</span>
      </footer>
    </AppStyled>
  );
};

export default App;
