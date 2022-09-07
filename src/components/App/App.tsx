import AppStyled from "./AppStyled";
import { Navigate, Route, Routes, Link } from "react-router-dom";
import SignUpPage from "../../pages/SignUpPage/SignUpPage";
import LogInPage from "../../pages/LogInPage/LogInPage";
import NavigationMenu from "../NavigationMenu/NavigationMenu";
import Modal from "../Modal/Modal";
import { useEffect } from "react";
import useToken from "../../hooks/useToken/useToken";
import routes from "../../configs/routes";
import ExplorePage from "../../pages/ExplorePage/ExplorePage";
import ProjectDetailsPage from "../../pages/ProjectDetailsPage/ProjectDetailsPage";
import ManageProjectPage from "../../pages/ManageProjectPage/ManageProjectPage";
import Validator from "../Validator/Validator";
import UserProjectsPage from "../../pages/UserProjectsPage/UserProjectsPage";
import { useAppSelector } from "../../app/hooks";

const App = (): JSX.Element => {
  const isLogged = useAppSelector((state) => state.user.isLogged);
  const getToken = useToken();

  useEffect(() => {
    (async () => {
      await getToken();
    })();
  }, [getToken]);

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
        <Routes>
          <Route path={routes.root} element={<Navigate to={routes.home} />} />

          <Route path={routes.home} element={<ExplorePage />} />

          <Route
            element={
              <Validator option={!isLogged} rejectPath={routes.explore} />
            }
          >
            <Route path={routes.signUp} element={<SignUpPage />} />
          </Route>

          <Route
            element={
              <Validator option={!isLogged} rejectPath={routes.explore} />
            }
          >
            <Route path={routes.logIn} element={<LogInPage />} />
          </Route>

          <Route path={routes.explore} element={<ExplorePage />} />

          <Route
            element={<Validator option={isLogged} rejectPath={routes.logIn} />}
          >
            <Route
              path={routes.createProject}
              element={<ManageProjectPage isCreate={true} />}
            />
          </Route>

          <Route
            element={<Validator option={isLogged} rejectPath={routes.logIn} />}
          >
            <Route
              path={routes.personalProjects}
              element={<UserProjectsPage />}
            />
          </Route>

          <Route
            element={<Validator option={isLogged} rejectPath={routes.logIn} />}
          >
            <Route
              path={routes.updateProject}
              element={<ManageProjectPage isCreate={false} />}
            />
          </Route>

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
