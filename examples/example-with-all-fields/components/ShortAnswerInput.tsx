import React from "react";
import { useShortAnswerInput } from "@gforms-js/react-form-hooks";

interface ShortAnswerInputProps {
  id: string;
}

const ShortAnswerInput = ({ id }: ShortAnswerInputProps) => {
  const { register, error, label } = useShortAnswerInput(id);

  return (
    <div className="field-wrapper">
      <label>{label}</label>
      <input type="text" {...register()} placeholder={label} />
      {error?.type === "required" && (
        <span className="field-error">This field is required</span>
      )}
    </div>
  );
};

export { ShortAnswerInput };
