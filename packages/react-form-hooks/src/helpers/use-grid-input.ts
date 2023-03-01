import {
  TickBoxGridField,
  MultipleChoiceGridField,
  GridLine,
  GridColumn,
} from "@gforms-js/types";
import { useEffect, useState } from "react";
import { FieldError, RegisterOptions } from "react-hook-form";
import { useGoogleFormContext } from "../context/google-form-context";
import { RegisterFunction } from "../types";
import { assertContextDefined } from "./assert-context-defined";
import { slugify } from "./slugify";

type GridInputField = MultipleChoiceGridField | TickBoxGridField;

type ColumnRenderer = GridColumn & {
  registerColumn: RegisterFunction;
} & { id: string };

type RenderColumnFunction = (column: ColumnRenderer) => JSX.Element;

type LineRenderer = GridLine & {
  renderColumns: (render: RenderColumnFunction) => JSX.Element[];
};

type RenderLineFunction = (line: LineRenderer) => JSX.Element;

type UseGridInputReturn = GridInputField & {
  renderGrid: (render: RenderLineFunction) => JSX.Element[];
} & {
  errors?: Record<string, FieldError>;
};

const useGridInput = (id: string): UseGridInputReturn => {
  const context = useGoogleFormContext();

  assertContextDefined(context);

  const [errors, setErrors] = useState<Record<string, FieldError> | undefined>(
    undefined
  );

  const field = context.getField(id) as GridInputField;

  const buildId = (lineId: string, value: string) => {
    return `${id}-${lineId}-${slugify(value)}`;
  };

  useEffect(() => {
    const newErrors = field.lines.reduce((acc, l) => {
      const fieldError = context.formState.errors[l.id] as FieldError;

      if (fieldError) {
        acc[l.id] = fieldError;
      }

      return acc;
    }, {} as Record<string, FieldError>);

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors(undefined);
    }
  }, [context.formState.errors]);

  const renderGrid = (render: RenderLineFunction): JSX.Element[] => {
    return field.lines.map((l) => {
      const registerLine = (options?: RegisterOptions) =>
        context.register(l.id, { required: field.required, ...options });

      const renderColumns = (render: RenderColumnFunction): JSX.Element[] => {
        return field.columns.map((c) => {
          const id = buildId(l.id, c.label);
          const registerColumn = (options?: RegisterOptions) => ({
            ...registerLine(options),
            value: c.label,
          });

          return render({ ...c, registerColumn, id });
        });
      };

      return render({ ...l, renderColumns });
    });
  };

  return { ...field, renderGrid, errors };
};

export { useGridInput };
