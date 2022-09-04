import SignForm from "../../components/SignForm/SignForm";

const LogInPage = (): JSX.Element => (
  <>
    <h2 className="page__title">
      <span className="page__title--bold">Log in</span>
    </h2>

    <SignForm isLogin={true} />
  </>
);

export default LogInPage;
