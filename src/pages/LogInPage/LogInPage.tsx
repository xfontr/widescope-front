import React from "react";
import SignForm from "../../components/SignForm/SignForm";

const LogInPage = React.memo(
  (): JSX.Element => (
    <>
      <h2 className="page__title">
        <span className="page__title--bold">Log in</span>
      </h2>

      <SignForm isLogin={true} />
    </>
  )
);

export default LogInPage;
