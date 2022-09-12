import { useState } from "react";
import { validateForm } from "../../utils/forms/validateForm";
import RenderForm from "../RenderForm/RenderForm";
import { FormErrorsState } from "../RenderForm/RenderFormTypes";
import searchSchema from "../../schemas/searchSchema";

const searchInitialState = {
  sarch: "",
};

const errorsInitialState: FormErrorsState = {
  errors: [],
  failedInputs: [],
};

const SearchBar = (): JSX.Element => {
  const [errors, setErrors] = useState(errorsInitialState);
  const [value, setValue] = useState(searchInitialState);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateForm(searchSchema, value, setErrors)) {
      return;
    }
  };

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <RenderForm
          errors={errors}
          formType="search"
          state={value}
          setter={setValue}
        />
      </form>
    </section>
  );
};

export default SearchBar;
