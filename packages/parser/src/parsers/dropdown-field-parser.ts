import {
  CustomOptionField,
  DropdownField,
  Option,
} from "@google-forms-js/types";
import { RawCustomOptionField, RawFieldParser } from "../types";
import { baseFieldParser } from "./base-field-parser";

const dropdownFieldParser: RawFieldParser<RawCustomOptionField> = (
  rawField
): CustomOptionField => {
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
    asdasd: "asdads",
  };
};

export { dropdownFieldParser };
