import { useState } from "react";
import { Link } from "react-router-dom";
import { navRoutes } from "../../configs/routes";
import useUser from "../../hooks/useUser/useUser";
import loginSchema from "../../schemas/loginSchema";
import registerSchema from "../../schemas/registerSchema";
import Button from "../Button/Button";
import {
  FooterStyled,
  GroupStyled,
  HeaderStyled,
  InputStyled,
  LabelStyled,
  SignFormStyled,
} from "../../styles/FormStyled";
import Joi from "joi";
import { validateForm } from "../../utils/validateForm/validateForm";
import Errors from "../Errors/Errors";

interface SignFormProps {
  isLogin: boolean;
}

const initialState = {
  name: "",
  password: "",
  repeatPassword: "",
  email: "",
};

const errorsInitialState = {
  errors: [] as Joi.ValidationErrorItem[],
  failedInputs: [] as string[],
};

const SignForm = ({ isLogin }: SignFormProps): JSX.Element => {
  const { signUp, logIn } = useUser();
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState(errorsInitialState);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setValues({
      ...values,
      [event.target.id]: event.target.value,
    });
  };

  const handlePasswordValidation = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target.value) {
      event.target.classList.remove("form__input--error-repeat");
      return;
    }

    if (values.password !== event.target.value) {
      event.target.className += event.target.className.includes(
        "form__input--error-repeat"
      )
        ? ""
        : " form__input--error-repeat";
    } else {
      event.target.classList.remove("form__input--error-repeat");
    }
  };

  const validateValues = (): boolean =>
    isLogin
      ? validateForm(
          loginSchema,
          { name: values.name, password: values.password },
          setErrors
        )
      : validateForm(registerSchema, values, setErrors);

  const logInAction = async () => {
    if (!validateValues()) {
      return;
    }

    await logIn({
      name: values.name,
      password: values.password,
    });
  };

  const signUpAction = async () => {
    if (!validateValues()) {
      return;
    }

    if (values.password !== values.repeatPassword) {
      return;
    }

    await signUp({
      name: values.name,
      password: values.password,
      email: values.email,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

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

      <GroupStyled>
        <LabelStyled htmlFor="name">Name</LabelStyled>
        <InputStyled
          className={
            errors.failedInputs.includes("name") ? "form__input--error" : ""
          }
          type="text"
          id="name"
          placeholder="John Doe"
          autoComplete="off"
          value={values.name}
          onChange={(event) => {
            handleChange(event);
          }}
        />
      </GroupStyled>

      <GroupStyled>
        <LabelStyled htmlFor="password">Password</LabelStyled>
        <InputStyled
          className={
            errors.failedInputs.includes("password") ? "form__input--error" : ""
          }
          type="password"
          id="password"
          autoComplete="off"
          value={values.password}
          onChange={(event) => {
            handleChange(event);
          }}
        />
      </GroupStyled>

      {!isLogin && (
        <>
          <GroupStyled>
            <LabelStyled htmlFor="repeatPassword">Repeat password</LabelStyled>
            <InputStyled
              className={
                errors.failedInputs.includes("repeatPassword")
                  ? "form__input--error"
                  : ""
              }
              type="password"
              id="repeatPassword"
              autoComplete="off"
              value={values.repeatPassword}
              onChange={(event) => {
                handleChange(event);
                handlePasswordValidation(event);
              }}
            />
          </GroupStyled>

          <GroupStyled>
            <LabelStyled htmlFor="email">Email address</LabelStyled>
            <InputStyled
              className={
                errors.failedInputs.includes("email")
                  ? "form__input--error"
                  : ""
              }
              type="email"
              id="email"
              value={values.email}
              onChange={(event) => {
                handleChange(event);
              }}
            />
          </GroupStyled>
        </>
      )}

      <Errors errors={errors} />

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
