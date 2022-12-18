import { Field, GoogleForm } from "@google-forms-js/types";
import { UseFormReturn } from "react-hook-form";

interface UseGoogleForm {
  (args: { form: GoogleForm }): UseFormReturn & {
    getField: (id: string) => Field;
  };
}

export { UseGoogleForm };
