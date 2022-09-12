import { FormErrors } from "../../utils/forms/validateForm";
import ErrorsStyled from "./ErrorsStyled";

interface ErrorsProps {
  errors: FormErrors;
}

const Errors = ({ errors }: ErrorsProps): JSX.Element => (
  <ErrorsStyled>
    {errors.failedInputs && (
      <ul className="error-list">
        {errors.errors.map((error, index) => (
          <li key={errors.failedInputs[index]} className="error-message">
            {error.message}
          </li>
        ))}
      </ul>
    )}
  </ErrorsStyled>
);

export default Errors;
