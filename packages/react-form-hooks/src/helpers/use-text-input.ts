import { ParagraphField, ShortAnswerField } from "@google-forms-js/types";
import { RegisterOptions } from "react-hook-form";
import { FieldError, RegisterReturn } from "../types";

import { useGoogleFormContext } from "../context/google-form-context";
import { assertContextDefined } from "./assert-context-defined";

type TextField = ShortAnswerField | ParagraphField;

type UseTextInputReturn = TextField & RegisterReturn & FieldError;

function useTextInput(id: string): UseTextInputReturn {
  const context = useGoogleFormContext();

  assertContextDefined(context);

  const field = context.getField(id) as TextField;

  const error = context.formState.errors[field.id];

  const register = (options?: RegisterOptions) =>
    context.register(id, { required: field.required, ...options });

  return { ...field, register, error };
}

export { useTextInput };
