import { useLinearScaleInput } from "@google-forms-js/react";
import React from "react";

interface LinearScaleInputProps {
  id: string;
}

const LinearScaleInput = ({ id }: LinearScaleInputProps) => {
  const { options, minNumberLabel, maxNumberLabel, error, label } =
    useLinearScaleInput(id);

  return (
    <div className="field-wrapper">
      <label>{label}</label>
      <div className="linear-scale-wrapper">
        <div>{minNumberLabel}</div>

        {options.map((o) => {
          return (
            <div key={o.id}>
              <span>{o.label}</span>
              <input key={o.id} type="radio" {...o.register()} />
            </div>
          );
        })}

        <div>{maxNumberLabel}</div>
      </div>
      {error?.type === "required" && (
        <span className="field-error">This field is required</span>
      )}
    </div>
  );
};

export { LinearScaleInput };
