import AppStyled from "./AppStyled";
import { Navigate, Route, Routes } from "react-router-dom";
import SignUpPage from "../../pages/SignUpPage/SignUpPage";
import LogInPage from "../../pages/LogInPage/LogInPage";
import NavigationMenu from "../NavigationMenu/NavigationMenu";
import Modal from "../Modal/Modal";

const App = (): JSX.Element => {
  return (
    <AppStyled>
      <Modal />
      <header className="header">
        <h3>wideScope</h3>
        <NavigationMenu />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<LogInPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/log-in" element={<LogInPage />} />
        </Routes>
      </main>
      <footer className="footer">wideScope © 2022</footer>
    </AppStyled>
  );
};

export default App;
