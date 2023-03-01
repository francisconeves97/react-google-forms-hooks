import { FieldType, GoogleForm } from "@gforms-js/types";
import Head from "next/head";
import { GoogleFormProvider, useGoogleForm } from "@gforms-js/react";
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
