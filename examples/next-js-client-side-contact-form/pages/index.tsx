import { FieldType, GoogleForm } from "@google-forms-js/types";
import Head from "next/head";
import {
  GoogleFormProvider,
  useGoogleForm,
} from "@google-forms-js/react-form-hooks";
import form from "../config/form.json";
import { ParagraphInput } from "./components/ParagraphInput";
import { ShortAnswerInput } from "./components/ShortAnswerInput";

const fieldTypeMapper: Partial<{
  [k in FieldType]: React.FC<{ id: string }>;
}> = {
  PARAGRAPH: ParagraphInput,
  SHORT_ANSWER: ShortAnswerInput,
};

export default function Home() {
  const googleForm = useGoogleForm({ form: form as GoogleForm });

  const onSubmit = async (data: any) => {
    console.log(">>> data", data);
  };

  return (
    <>
      <Head>
        <title>Next.js Client Side Contact Form</title>
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
