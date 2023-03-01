import { CheckboxesField } from "@gforms-js/types";
import { useCustomOptionInput } from "./helpers/use-custom-option-input";

const useCheckboxesInput = (id: string) => {
  const customOptionInput = useCustomOptionInput<CheckboxesField>(id);

  if (customOptionInput.type !== "CHECKBOXES") {
    throw new Error(
      `Field "${id}" type is not CHECKBOXES and useCheckboxesInput hook was used`
    );
  }

  return customOptionInput;
};

export { useCheckboxesInput };
