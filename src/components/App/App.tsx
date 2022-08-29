import AppStyled from "./AppStyled";

const App = (): JSX.Element => {
  return (
    <AppStyled>
      <header className="header">
        <h3>wideScope</h3>
      </header>
      <footer className="footer">wideScope © 2022</footer>
    </AppStyled>
  );
};

export default App;
