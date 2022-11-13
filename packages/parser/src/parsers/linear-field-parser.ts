import { LinearScaleField, Option } from "@google-forms-js/types";
import { RawLinearField } from "../types";
import { baseFieldParser } from "./base-field-parser";

const flattenArray = (array: string[][]): Option[] => {
  return array.map((item) => ({ label: item[0] }));
};

const linearFieldParser = (
  rawField: RawLinearField
): Omit<LinearScaleField, "type"> => {
  const fieldInfo = rawField[4][0];

  const [minNumberLabel, maxNumberLabel] = fieldInfo[3];

  return {
    ...baseFieldParser(rawField),
    minNumberLabel,
    maxNumberLabel,
    options: flattenArray(fieldInfo[1]),
  };
};

export { linearFieldParser };
