import { GoogleForm, GoogleFormField } from "@google-forms-js/types";
import {
  UseFormRegisterReturn,
  RegisterOptions,
  FieldErrorsImpl,
  UseFormReturn,
} from "react-hook-form";

interface RegisterReturn {
  register: (options?: RegisterOptions) => UseFormRegisterReturn;
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

export {
  RegisterReturn,
  GoogleFormFieldError,
  UseGoogleForm,
  UseGoogleFormReturn,
  UseFieldHookReturn,
};
