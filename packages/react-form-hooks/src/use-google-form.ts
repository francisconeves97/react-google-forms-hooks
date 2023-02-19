import { useForm } from "react-hook-form";
import { GoogleForm } from "@google-forms-js/types";
import { UseGoogleForm } from "./types";

const resolveField = (id: string, form: GoogleForm) => {
  const fieldIndex = form.fieldsPositionMap[id];

  if (fieldIndex === undefined) {
    throw new Error(`Field with id ${id} wasn't found in your form.`);
  }

  return form.fields[fieldIndex];
};

const useGoogleForm: UseGoogleForm = ({ form }: { form: GoogleForm }) => {
  const methods = useForm();

  return {
    ...methods,
    getField: (id: string) => resolveField(id, form),
  };
};

export { useGoogleForm };