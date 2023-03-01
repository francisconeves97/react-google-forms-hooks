import { useMultipleChoiceGridInput } from "@gforms-js/react";
import React from "react";

interface MultipleChoiceGridInputProps {
  id: string;
}

const MultipleChoiceGridInput = ({ id }: MultipleChoiceGridInputProps) => {
  const { columns, renderGrid, label, errors } = useMultipleChoiceGridInput(id);

  return (
    <div className="field-wrapper">
      <label>{label}</label>
      <div style={{ display: "table" }}>
        <div style={{ display: "table-row" }}>
          <div className="table-cell" />
          {columns.map((c) => (
            <div key={c.label} className="table-cell">
              {c.label}
            </div>
          ))}
        </div>
        {renderGrid((l) => (
          <div key={l.label} style={{ display: "table-row" }}>
            <div className="table-cell">{l.label}</div>
            {l.renderColumns((c) => (
              <div key={c.label} className="table-cell">
                <input type="radio" {...c.registerColumn()} />
              </div>
            ))}
          </div>
        ))}
      </div>
      {errors && Object.keys(errors).length > 0 && (
        <span className="field-error">This field is required</span>
      )}
    </div>
  );
};

export { MultipleChoiceGridInput };
