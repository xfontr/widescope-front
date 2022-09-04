import SignForm from "../../components/SignForm/SignForm";

const SignUpPage = (): JSX.Element => (
  <>
    <h2 className="page__title">
      <span className="page__title--bold">Sign up</span>
    </h2>

    <SignForm isLogin={false} />
  </>
);

export default SignUpPage;
