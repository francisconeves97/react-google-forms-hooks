import {
  GoogleForm,
  FieldsPositionMap,
  GoogleFormField,
  FieldType,
} from "@google-forms-js/types";
import { baseFieldParser } from "./parsers/base-field-parser";
import { customOptionFieldParser } from "./parsers/custom-option-field-parser";
import { dropdownFieldParser } from "./parsers/dropdown-field-parser";
import { gridFieldParser } from "./parsers/grid-field-parser";
import { linearFieldParser } from "./parsers/linear-field-parser";
import { RawField, RawFieldType, RawFormData } from "./types";

const fieldTypeParsers: Record<
  RawFieldType,
  {
    parser: any;
    type?: FieldType;
  }
> = {
  [RawFieldType.SHORT_ANSWER]: {
    parser: baseFieldParser,
    type: "SHORT_ANSWER",
  },
  [RawFieldType.PARAGRAPH]: {
    parser: baseFieldParser,
    type: "PARAGRAPH",
  },
  [RawFieldType.MULTIPLE_CHOICE]: {
    parser: customOptionFieldParser,
    type: "MULTIPLE_CHOICE",
  },
  [RawFieldType.CHECKBOXES]: {
    parser: customOptionFieldParser,
    type: "CHECKBOXES",
  },
  [RawFieldType.DROPDOWN]: {
    parser: dropdownFieldParser,
    type: "DROPDOWN",
  },
  [RawFieldType.LINEAR_SCALE]: {
    parser: linearFieldParser,
    type: "LINEAR_SCALE",
  },
  [RawFieldType.GRID]: {
    parser: gridFieldParser,
  },
  [RawFieldType.DATE]: {
    parser: baseFieldParser,
    type: "DATE",
  },
} as const;

interface ParseFields {
  (rawFields: RawField[]): {
    fields: GoogleFormField[];
    fieldsPositionMap: FieldsPositionMap;
  };
}

const parseFields: ParseFields = (rawFields) => {
  const fields: GoogleFormField[] = [];

  const fieldsPositionMap = {} as FieldsPositionMap;

  rawFields.forEach((rawField, i) => {
    const rawFieldType = rawField[3];

    const fieldParser = fieldTypeParsers[rawFieldType];

    if (!fieldParser) {
      return;
    }

    const fieldData = fieldParser.parser(rawField);

    fieldsPositionMap[fieldData.id] = i;

    const field = {
      ...fieldData,
    } as GoogleFormField;

    if (fieldParser.type) {
      field.type = fieldParser.type;
    }

    fields.push(field);
  });

  return { fields, fieldsPositionMap };
};

interface ParseRawFormData {
  (rawFormData: RawFormData): GoogleForm;
}

const parseRawFormData: ParseRawFormData = ({ fbzx, rawFormDataTuple }) => {
  const googleForm = {} as GoogleForm;

  googleForm.formMetadata = {
    action: rawFormDataTuple[14],
    fvv: 1,
    pageHistory: 0,
    fbzx,
  };

  googleForm.title = rawFormDataTuple[1][8];

  const description = rawFormDataTuple[1][0];

  if (description) {
    googleForm.description = description;
  }

  const { fields, fieldsPositionMap } = parseFields(rawFormDataTuple[1][1]);
  googleForm.fields = fields;
  googleForm.fieldsPositionMap = fieldsPositionMap;

  return googleForm;
};

export { parseRawFormData };
