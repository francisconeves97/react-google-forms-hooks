import { GoogleForm, GoogleFormField, Option } from "@google-forms-js/types";
import {
  UseFormRegisterReturn,
  RegisterOptions,
  FieldErrorsImpl,
  UseFormReturn,
} from "react-hook-form";

type RegisterFunction = (options?: RegisterOptions) => UseFormRegisterReturn;

interface RegisterReturn {
  register: RegisterFunction;
}

interface GoogleFormFieldError {
  error?: FieldErrorsImpl[string];
}

type UseFieldHookReturn<FieldType extends GoogleFormField> = FieldType &
  RegisterReturn &
  GoogleFormFieldError;

type UseGoogleFormReturn = UseFormReturn & {
  getField: (id: string) => GoogleFormField;
};

interface UseGoogleForm {
  (args: { form: GoogleForm }): UseGoogleFormReturn;
}

interface OptionInput extends Option, GoogleFormFieldError {
  id: string;
  register: RegisterFunction;
}

export {
  RegisterReturn,
  GoogleFormFieldError,
  UseGoogleForm,
  UseGoogleFormReturn,
  UseFieldHookReturn,
  RegisterFunction,
  OptionInput,
};
