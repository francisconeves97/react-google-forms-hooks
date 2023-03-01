import { BaseField } from "@gforms-js/types";
import { RawField } from "../types";
import { numberToBoolean } from "./helpers/number-to-boolean";

const baseFieldParser = (rawField: RawField) => {
  const fieldInfo = rawField[4][0];

  const parsedField: BaseField = {
    id: fieldInfo[0].toString(),
    label: rawField[1],
    required: numberToBoolean(fieldInfo[2]),
  };

  const description = rawField[2];

  if (description) {
    parsedField.description = description;
  }

  return parsedField;
};

export { baseFieldParser };
