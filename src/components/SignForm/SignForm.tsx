import { useState } from "react";
import useUser from "../../hooks/useUser";
import registerSchema from "../../schemas/registerSchema";
import Button from "../Button/Button";
import {
  FooterStyled,
  GroupStyled,
  HeaderStyled,
  InputStyled,
  LabelStyled,
  SignFormStyled,
} from "./SignFormStyled";

interface SignFormProps {
  isLogin: boolean;
}

const initialState = {
  name: "",
  password: "",
  repeatPassword: "",
  email: "",
};

const SignForm = ({ isLogin }: SignFormProps): JSX.Element => {
  const { signUp } = useUser();
  const [values, setValues] = useState(initialState);

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
      event.target.classList.remove("form__input--error");
      return;
    }

    if (values.password !== event.target.value) {
      event.target.className += event.target.className.includes(
        "form__input--error"
      )
        ? ""
        : " form__input--error";
    } else {
      event.target.classList.remove("form__input--error");
    }
  };

  const validateValues = (): boolean => {
    const validation = registerSchema.validate(values);
    console.log(validation);
    if (validation.error) {
      return false;
    } else {
      return true;
    }
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();

    if (!validateValues()) {
      return;
    }

    if (!isLogin && values.password !== values.repeatPassword) {
      return;
    }

    await signUp({
      name: values.name,
      password: values.password,
      email: values.email,
    });
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

      <FooterStyled>
        <Button type="submit" content={`${isLogin ? "Log in" : "Sign up"}`} />
        {isLogin && (
          <span className="form__sign-up-cta">
            Don't have an account? Sign up for free
          </span>
        )}
      </FooterStyled>
    </SignFormStyled>
  );
};

export default SignForm;
