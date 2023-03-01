import { useDropdownInput } from "@google-forms-js/react";
import React from "react";

interface DropdownInputProps {
  id: string;
}

const DropdownInput = ({ id }: DropdownInputProps) => {
  const { register, options, label, error } = useDropdownInput(id);

  return (
    <div className="field-wrapper">
      <label>{label}</label>
      <select {...register()}>
        <option value="">Select option</option>
        {options.map((o) => {
          return (
            <option key={o.label} value={o.label}>
              {o.label}
            </option>
          );
        })}
      </select>
      {error?.type === "required" && (
        <span className="field-error">This field is required</span>
      )}
    </div>
  );
};

export { DropdownInput };
