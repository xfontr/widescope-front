import AppStyled from "./AppStyled";
import SignForm from "../SignForm/SignForm";
import { Navigate, Route, Routes } from "react-router-dom";

const App = (): JSX.Element => {
  return (
    <AppStyled>
      <header className="header">
        <h3>wideScope</h3>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<SignForm isLogin={true} />} />
          <Route path="/sign-up" element={<SignForm isLogin={false} />} />
        </Routes>
      </main>
      <footer className="footer">wideScope © 2022</footer>
    </AppStyled>
  );
};

export default App;
