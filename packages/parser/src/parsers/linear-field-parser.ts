import { LinearScaleField } from "@gforms-js/types";
import { RawLinearField } from "../types";
import { baseFieldParser } from "./base-field-parser";
import { flattenOptionsArray } from "./helpers/flatten-options-array";

const linearFieldParser = (
  rawField: RawLinearField
): Omit<LinearScaleField, "type"> => {
  const fieldInfo = rawField[4][0];

  const [minNumberLabel, maxNumberLabel] = fieldInfo[3];

  return {
    ...baseFieldParser(rawField),
    minNumberLabel,
    maxNumberLabel,
    options: flattenOptionsArray(fieldInfo[1]),
  };
};

export { linearFieldParser };
