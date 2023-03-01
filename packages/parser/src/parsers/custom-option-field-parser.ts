import { CustomOptionField, Option } from "@gforms-js/types";
import { RawCustomOptionField } from "../types";
import { baseFieldParser } from "./base-field-parser";
import { numberToBoolean } from "./helpers/number-to-boolean";

const customOptionFieldParser = (
  rawField: RawCustomOptionField
): CustomOptionField => {
  const options: Option[] = [];
  let hasCustomOption = false;

  const fieldInfo = rawField[4][0];
  const rawOptions = fieldInfo[1];

  for (const rawOption of rawOptions) {
    const isCustomOption = numberToBoolean(rawOption[4]);

    if (isCustomOption) {
      hasCustomOption = true;

      continue;
    }

    options.push({
      label: rawOption[0],
    });
  }

  return {
    ...baseFieldParser(rawField),
    hasCustomOption,
    options,
  };
};

export { customOptionFieldParser };
