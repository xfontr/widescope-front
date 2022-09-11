import { FormErrors } from "../../utils/validateForm/validateForm";
import ErrorsStyled from "./ErrorsStyled";

interface ErrorsProps {
  errors: FormErrors;
}

const Errors = ({ errors }: ErrorsProps): JSX.Element => (
  <ErrorsStyled>
    {errors.failedInputs && (
      <ul className="error-list">
        {errors.errors.map((error) => (
          <li className="error-message">{error.message}</li>
        ))}
      </ul>
    )}
  </ErrorsStyled>
);

export default Errors;
