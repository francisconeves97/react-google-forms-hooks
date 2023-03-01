import {
  GridLine,
  MultipleChoiceGridField,
  TickBoxGridField,
} from "@gforms-js/types";
import { RawGridField } from "../types";
import { baseFieldParser } from "./base-field-parser";
import { flattenOptionsArray } from "./helpers/flatten-options-array";
import { numberToBoolean } from "./helpers/number-to-boolean";

const parseLines = (rawField: RawGridField): GridLine[] => {
  const rawLines = rawField[4];

  return rawLines.map((rawLine) => ({
    id: rawLine[0].toString(),
    label: rawLine[3][0],
  }));
};

const gridFieldParser = (
  rawField: RawGridField
): MultipleChoiceGridField | TickBoxGridField => {
  const fieldInfo = rawField[4][0];

  const isTickboxGrid = numberToBoolean(fieldInfo[11][0]);
  const columns = flattenOptionsArray(fieldInfo[1]);

  return {
    ...baseFieldParser(rawField),
    type: isTickboxGrid ? "TICK_BOX_GRID" : "MULTIPLE_CHOICE_GRID",
    columns,
    lines: parseLines(rawField),
  };
};

export { gridFieldParser };
