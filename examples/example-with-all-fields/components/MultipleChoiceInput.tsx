import React from "react";
import { useMultipleChoiceInput } from "@gforms-js/react";

interface MultipleChoiceInputProps {
  id: string;
}

const MultipleChoiceInput = ({ id }: MultipleChoiceInputProps) => {
  const { error, label, options, customOption } = useMultipleChoiceInput(id);

  return (
    <div className="field-wrapper">
      <label>{label}</label>
      <div className="field-wrapper">
        {options.map((o) => (
          <div key={o.id}>
            <input type="radio" id={o.id} {...o.register()} />
            <label htmlFor={o.id}>{o.label}</label>
          </div>
        ))}
      </div>
      {customOption && (
        <div>
          <input
            type="radio"
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

export { MultipleChoiceInput };
