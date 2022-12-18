import { GoogleForm, Field } from "@google-forms-js/types";
import {
  UseFormRegisterReturn,
  RegisterOptions,
  FieldErrorsImpl as ReactHookFormFieldError,
  UseFormReturn,
} from "react-hook-form";

interface RegisterReturn {
  register: (options?: RegisterOptions) => UseFormRegisterReturn;
}

interface FieldError {
  error?: ReactHookFormFieldError[string];
}

type UseGoogleFormReturn = UseFormReturn & {
  getField: (id: string) => Field;
};

interface UseGoogleForm {
  (args: { form: GoogleForm }): UseGoogleFormReturn;
}

export { RegisterReturn, FieldError, UseGoogleForm, UseGoogleFormReturn };
