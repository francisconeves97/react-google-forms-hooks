import React from "react";
import { useCheckboxesInput } from "@google-forms-js/react";

interface CheckboxesInputProps {
  id: string;
}

const CheckboxesInput = ({ id }: CheckboxesInputProps) => {
  const { error, label, options, customOption } = useCheckboxesInput(id);

  return (
    <div className="field-wrapper">
      <label>{label}</label>
      <div className="field-wrapper">
        {options.map((o) => (
          <div key={o.id}>
            <input type="checkbox" id={o.id} {...o.register()} />
            <label htmlFor={o.id}>{o.label}</label>
          </div>
        ))}
      </div>
      {customOption && (
        <div>
          <input
            type="checkbox"
            id={customOption.id}
            {...customOption.register()}
          />
          <label htmlFor={customOption.id}>Outra</label>
          <input
            type="text"
            placeholder="Answer here"
            {...customOption.registerCustomOptionInput()}
          />
        </div>
      )}
      {error?.type === "required" && (
        <span className="field-error">This field is required</span>
      )}
    </div>
  );
};

export { CheckboxesInput };
