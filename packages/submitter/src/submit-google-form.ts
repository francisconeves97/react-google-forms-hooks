import fetch from "isomorphic-unfetch";
import { GoogleForm } from "@gforms-js/types";
import { formatFieldName } from "./format-field-name";

const GOOGLE_FORMS_URL = "https://docs.google.com/forms/d";

interface SubmitGoogleForm {
  (
    form: GoogleForm,
    formData: Record<string, string | string[] | null>
  ): Promise<{
    success: boolean;
  }>;
}

const submitGoogleForm: SubmitGoogleForm = async (form, formData) => {
  const urlParams = new URLSearchParams();

  Object.keys(formData).forEach((fieldId) => {
    const fieldValue = formData[fieldId];

    if (fieldValue) {
      if (Array.isArray(fieldValue)) {
        fieldValue.forEach((answer) => {
          urlParams.append(formatFieldName(fieldId), answer);
        });
      } else {
        urlParams.append(formatFieldName(fieldId), fieldValue);
      }
    }
  });

  const response = await fetch(
    `${GOOGLE_FORMS_URL}/${
      form.formMetadata.action
    }/formResponse?submit=Submit&${urlParams.toString()}`,
    {
      method: "GET",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  const wasSuccessful =
    response.ok && response.status < 300 && response.status >= 200;

  return {
    success: wasSuccessful,
  };
};

export { submitGoogleForm };
