import React from "react";
import { useParagraphInput } from "@gforms-js/react-form-hooks";

interface ParagraphInputProps {
  id: string;
}

const ParagraphInput = ({ id }: ParagraphInputProps) => {
  const { register, error, label } = useParagraphInput(id);

  return (
    <div className="field-wrapper">
      <label>{label}</label>
      <textarea {...register()} placeholder={label} />
      {error?.type === "required" && (
        <span className="field-error">This field is required</span>
      )}
    </div>
  );
};

export { ParagraphInput };
