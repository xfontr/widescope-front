import { FormComponents } from "../../components/RenderForm/RenderFormTypes";
import { FormValue } from "../../configs/allFormFields";

const createFormFrom = (
  formType: FormComponents,
  allFormValues: Record<string, FormValue>
): FormValue[] =>
  Object.values(allFormValues).filter((formValue) =>
    formValue.belongsTo.includes(formType)
  );

export default createFormFrom;
