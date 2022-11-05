import { BaseField } from "@google-forms-js/types";
import { RawField, RawFieldParser } from "../types";
import { numberToBoolean } from "./helpers/number-to-boolean";

const baseFieldParser: RawFieldParser<RawField, BaseField> = (rawField) => {
  const fieldInfo = rawField[4][0];

  const label = rawField[1];
  const description = rawField[2];

  return {
    id: fieldInfo[0].toString(),
    label,
    description,
    required: numberToBoolean(fieldInfo[2]),
  };
};

export { baseFieldParser };
