import { ShortAnswerField } from "@gforms-js/types";
import { useTextInput } from "./helpers/use-text-input";
import { UseFieldHookReturn } from "./types";

const useShortAnswerInput = (
  id: string
): UseFieldHookReturn<ShortAnswerField> => {
  const textInput = useTextInput(id);

  if (textInput.type !== "SHORT_ANSWER") {
    throw new Error(
      `Field "${id}" type is not SHORT_ANSWER and useShortAnswerInput hook was used`
    );
  }

  return textInput;
};

export { useShortAnswerInput };
