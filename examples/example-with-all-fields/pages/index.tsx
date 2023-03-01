import Head from "next/head";
import {
  GoogleFormProvider,
  useGoogleForm,
  FieldType,
  GoogleForm,
} from "@google-forms-js/react";
import form from "../config/form.json";
import { ParagraphInput } from "../components/ParagraphInput";
import { ShortAnswerInput } from "../components/ShortAnswerInput";
import { CheckboxesInput } from "../components/CheckboxesInput";
import { MultipleChoiceInput } from "../components/MultipleChoiceInput";
import { DropdownInput } from "../components/DropdownInput";
import { LinearScaleInput } from "../components/LinearScaleInput";
import { MultipleChoiceGridInput } from "../components/MultipleChoiceGridInput";
import { TickBoxGridInput } from "../components/TickBoxGridInput";

const fieldTypeMapper: Partial<{
  [k in FieldType]: React.FC<{ id: string }>;
}> = {
  PARAGRAPH: ParagraphInput,
  SHORT_ANSWER: ShortAnswerInput,
  CHECKBOXES: CheckboxesInput,
  MULTIPLE_CHOICE: MultipleChoiceInput,
  DROPDOWN: DropdownInput,
  LINEAR_SCALE: LinearScaleInput,
  MULTIPLE_CHOICE_GRID: MultipleChoiceGridInput,
  TICK_BOX_GRID: TickBoxGridInput,
};

export default function Home() {
  const googleForm = useGoogleForm({ form: form as GoogleForm });

  const onSubmit = async (data: any) => {
    const response = await fetch("/api/contact-form", {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (response.status < 200 || response.status >= 300) {
      alert("Failed to submit form");
    } else {
      alert("Submitted form with success");
    }
  };

  return (
    <>
      <Head>
        <title>Example with all supported fields</title>
      </Head>
      <main>
        <GoogleFormProvider {...googleForm}>
          <form onSubmit={googleForm.handleSubmit(onSubmit)}>
            {form.fields.map((field) => {
              const Component = fieldTypeMapper[field.type as FieldType];

              if (!Component) {
                return null;
              }

              return <Component key={field.id} id={field.id} />;
            })}

            <button type="submit">Submit</button>
          </form>
        </GoogleFormProvider>
      </main>
    </>
  );
}
