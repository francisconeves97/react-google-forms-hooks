import { CustomOptionField, Option } from "@google-forms-js/types";
import { RawCustomOptionField, RawFieldParser } from "../types";
import { baseFieldParser } from "./base-field-parser";
import { numberToBoolean } from "./helpers/number-to-boolean";

const customOptionFieldParser: RawFieldParser<
  RawCustomOptionField,
  CustomOptionField
> = (rawField) => {
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
