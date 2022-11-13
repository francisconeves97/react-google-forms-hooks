import { DropdownField, Option } from "@google-forms-js/types";
import { RawDropdownField } from "../types";
import { baseFieldParser } from "./base-field-parser";

const dropdownFieldParser = (
  rawField: RawDropdownField
): Omit<DropdownField, "type"> => {
  const options: Option[] = [];

  const fieldInfo = rawField[4][0];
  const rawOptions = fieldInfo[1];

  for (const rawOption of rawOptions) {
    options.push({
      label: rawOption[0],
    });
  }

  return {
    ...baseFieldParser(rawField),
    options,
  };
};

export { dropdownFieldParser };
