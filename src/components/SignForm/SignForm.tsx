import { useState } from "react";
import Button from "../Button/Button";

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
  const [values, setValues] = useState(initialState);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setValues({
      ...values,
      [event.target.id]: event.target.value,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
  };

  return (
    <form data-testId="form" onSubmit={(event) => handleSubmit(event)}>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        id="name"
        placeholder="John Doe"
        autoComplete="off"
        value={values.name}
        onChange={(event) => {
          handleChange(event);
        }}
      />

      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        autoComplete="off"
        value={values.password}
        onChange={(event) => {
          handleChange(event);
        }}
      />

      {!isLogin && (
        <>
          <label htmlFor="repeatPassword">Repeat password</label>
          <input
            type="password"
            id="repeatPassword"
            autoComplete="off"
            value={values.repeatPassword}
            onChange={(event) => {
              handleChange(event);
            }}
          />

          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            value={values.email}
            onChange={(event) => {
              handleChange(event);
            }}
          />
        </>
      )}

      <Button type="submit" content={`${isLogin ? "Log in" : "Sign up"}`} />
    </form>
  );
};

export default SignForm;
