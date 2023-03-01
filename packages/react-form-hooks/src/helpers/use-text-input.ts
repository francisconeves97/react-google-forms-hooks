import { ParagraphField, ShortAnswerField } from "@gforms-js/types";
import { RegisterOptions } from "react-hook-form";
import { UseFieldHookReturn } from "../types";

import { useGoogleFormContext } from "../context/google-form-context";
import { assertContextDefined } from "./assert-context-defined";

type TextField = ShortAnswerField | ParagraphField;

function useTextInput(id: string): UseFieldHookReturn<TextField> {
  const context = useGoogleFormContext();

  assertContextDefined(context);

  const field = context.getField(id) as TextField;

  const error = context.formState.errors[field.id];

  const register = (options?: RegisterOptions) =>
    context.register(id, { required: field.required, ...options });

  return { ...field, register, error };
}

export { useTextInput };
