import { BaseField } from "@google-forms-js/types";
import { RawFieldParser, RawTextField } from "../types";
import { numberToBoolean } from "./helpers/number-to-boolean";
import { parseCommonFields } from "./helpers/parse-common-fields";

const textFieldParser: RawFieldParser<RawTextField, BaseField> = (rawField) => {
  const fieldInfo = rawField[4][0];

  return {
    ...parseCommonFields(rawField),
    id: fieldInfo[0].toString(),
    required: numberToBoolean(fieldInfo[2]),
  };
};

export { textFieldParser };
