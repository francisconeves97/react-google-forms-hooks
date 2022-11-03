import { RawField } from "../../types";

const parseCommonFields = (rawField: RawField) => {
  const label = rawField[1];
  const description = rawField[2];

  return {
    label,
    description,
  };
};

export { parseCommonFields };
