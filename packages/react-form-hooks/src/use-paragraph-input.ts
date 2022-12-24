import { ParagraphField } from "@google-forms-js/types";
import { useTextInput } from "./helpers/use-text-input";
import { UseFieldHookReturn } from "./types";

const useParagraphInput = (id: string): UseFieldHookReturn<ParagraphField> => {
  const textInput = useTextInput(id);

  if (textInput.type !== "PARAGRAPH") {
    throw new Error(
      `Field "${id}" type is not PARAGRAPH and useParagraphInput hook was used`
    );
  }

  return textInput;
};

export { useParagraphInput };
