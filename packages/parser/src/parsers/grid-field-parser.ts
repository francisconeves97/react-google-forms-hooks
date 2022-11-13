import { GridField, GridLine } from "@google-forms-js/types";
import { RawGridField } from "../types";
import { baseFieldParser } from "./base-field-parser";
import { flattenOptionsArray } from "./helpers/flatten-options-array";

const parseLines = (rawField: RawGridField): GridLine[] => {
  const rawLines = rawField[4];

  return rawLines.map((rawLine) => ({
    id: rawLine[0].toString(),
    label: rawLine[3][0],
  }));
};

const gridFieldParser = (rawField: RawGridField): GridField => {
  const fieldInfo = rawField[4][0];

  const columns = flattenOptionsArray(fieldInfo[1]);

  return {
    ...baseFieldParser(rawField),
    columns,
    lines: parseLines(rawField),
  };
};

export { gridFieldParser };
