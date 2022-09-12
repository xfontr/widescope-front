import { FormComponents, FormValue } from "../../configs/allFormFields";

const createFormFrom = (
  formType: FormComponents,
  allFormValues: Record<string, FormValue>
) =>
  Object.values(allFormValues).filter((formValue) =>
    formValue.belongsTo.includes(formType)
  );

export default createFormFrom;
