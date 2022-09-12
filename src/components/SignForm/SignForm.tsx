import { useState } from "react";
import { Link } from "react-router-dom";
import { navRoutes } from "../../configs/routes";
import useUser from "../../hooks/useUser/useUser";
import loginSchema from "../../schemas/loginSchema";
import registerSchema from "../../schemas/registerSchema";
import Button from "../Button/Button";
import {
  FooterStyled,
  HeaderStyled,
  SignFormStyled,
} from "../RenderForm/RenderFormStyled";
import { validateForm } from "../../utils/forms/validateForm";
import Errors from "../Errors/Errors";
import RenderForm from "../RenderForm/RenderForm";
import { FormErrorsState } from "../RenderForm/RenderFormTypes";

interface SignFormProps {
  isLogin: boolean;
}

const errorsInitialState: FormErrorsState = {
  errors: [],
  failedInputs: [],
};

export const signFormInitialState = {
  name: "",
  password: "",
  repeatPassword: "",
  email: "",
};

const SignForm = ({ isLogin }: SignFormProps): JSX.Element => {
  const { signUp, logIn } = useUser();
  const [values, setValues] = useState(signFormInitialState);
  const [errors, setErrors] = useState(errorsInitialState);

  const validateValues = (): boolean =>
    isLogin
      ? validateForm(
          loginSchema,
          { name: values.name, password: values.password },
          setErrors
        )
      : validateForm(registerSchema, values, setErrors);

  const logInAction = async () => {
    await logIn({
      name: values.name,
      password: values.password,
    });
  };

  const signUpAction = async () => {
    await signUp({
      name: values.name,
      password: values.password,
      email: values.email,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateValues()) {
      return;
    }

    if (!isLogin) {
      signUpAction();
      return;
    }

    logInAction();
  };

  return (
    <SignFormStyled
      data-testid="form"
      onSubmit={(event) => {
        handleSubmit(event);
      }}
    >
      <HeaderStyled>
        <h3 className="form__heading">{`${isLogin ? "Log in" : "Sign up"}`}</h3>
        <span className="form__cta-text">
          Share your latests projects with the WideScope community.
        </span>
      </HeaderStyled>

      <RenderForm
        formType={`${isLogin ? "logIn" : "signUp"}`}
        errors={errors}
        state={values}
        setter={setValues}
      />

      {!isLogin && <Errors errors={errors} />}

      <FooterStyled>
        <Button type="submit" children={`${isLogin ? "Log in" : "Sign up"}`} />
        {isLogin && (
          <span className="form__sign-up-cta">
            Don't have an account?
            <Link to={navRoutes.signUp.path}>Sign up for free</Link>
          </span>
        )}
        {!isLogin && (
          <span className="form__sign-up-cta">
            Already have an account?
            <Link to={navRoutes.logIn.path}>Log in</Link>
          </span>
        )}
      </FooterStyled>
    </SignFormStyled>
  );
};

export default SignForm;
