import AppStyled from "./AppStyled";
import { Navigate, Route, Routes } from "react-router-dom";
import SignUpPage from "../../pages/SignUpPage/SignUpPage";
import LogInPage from "../../pages/LogInPage/LogInPage";
import NavigationMenu from "../NavigationMenu/NavigationMenu";

const App = (): JSX.Element => {
  return (
    <AppStyled>
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
