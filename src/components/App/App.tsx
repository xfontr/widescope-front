import AppStyled from "./AppStyled";
import SignForm from "../SignForm/SignForm";

const App = (): JSX.Element => {
  return (
    <AppStyled>
      <header className="header">
        <h3>wideScope</h3>
      </header>
      <SignForm isLogin={false} />
      <footer className="footer">wideScope © 2022</footer>
    </AppStyled>
  );
};

export default App;
