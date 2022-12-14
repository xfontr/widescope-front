import { useState } from "react";
import { validateForm } from "../../utils/forms/validateForm";
import RenderForm from "../RenderForm/RenderForm";
import { FormErrorsState } from "../RenderForm/RenderFormTypes";
import searchSchema from "../../schemas/searchSchema";
import Button from "../Button/Button";
import useUser from "../../hooks/useUser/useUser";
import { SignFormStyled } from "../RenderForm/RenderFormStyled";

const searchInitialState = {
  search: "",
};

const errorsInitialState: FormErrorsState = {
  errors: [],
  failedInputs: [],
};

const SearchBar = (): JSX.Element => {
  const [errors, setErrors] = useState(errorsInitialState);
  const [value, setValue] = useState(searchInitialState);
  const { addFriend } = useUser();

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();

    if (!validateForm(searchSchema, value, setErrors)) {
      return;
    }

    await addFriend(value.search);
  };

  return (
    <SignFormStyled onSubmit={handleSubmit} className="search-bar__container">
      <RenderForm
        errors={errors}
        formType="search"
        state={value}
        setter={setValue}
      />
      <Button children="Add friend" />
    </SignFormStyled>
  );
};

export default SearchBar;
