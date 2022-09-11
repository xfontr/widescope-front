import React from "react";
import SignForm from "../../components/SignForm/SignForm";

const SignUpPage = React.memo(
  (): JSX.Element => (
    <>
      <h2 className="page__title">
        <span className="page__title--bold">Sign up</span>
      </h2>

      <SignForm isLogin={false} />
    </>
  )
);

export default SignUpPage;
