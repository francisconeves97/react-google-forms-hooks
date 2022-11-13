import { RawField } from "../types";
import { numberToBoolean } from "./helpers/number-to-boolean";

const baseFieldParser = (rawField: RawField) => {
  const fieldInfo = rawField[4][0];

  return {
    id: fieldInfo[0].toString(),
    label: rawField[1],
    description: rawField[2],
    required: numberToBoolean(fieldInfo[2]),
  };
};

export { baseFieldParser };
