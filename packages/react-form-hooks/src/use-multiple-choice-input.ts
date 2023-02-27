import { MultipleChoiceField } from "@google-forms-js/types";
import { useCustomOptionInput } from "./helpers/use-custom-option-input";

const useMultipleChoiceInput = (id: string) => {
  const customOptionInput = useCustomOptionInput<MultipleChoiceField>(id);

  if (customOptionInput.type !== "MULTIPLE_CHOICE") {
    throw new Error(
      `Field "${id}" type is not MULTIPLE_CHOICE and useMultipleChoiceInput hook was used`
    );
  }

  return customOptionInput;
};

export { useMultipleChoiceInput };
