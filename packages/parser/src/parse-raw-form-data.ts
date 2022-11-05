import {
  GoogleForm,
  FieldsPositionMap,
  Field,
  FieldType,
} from "@google-forms-js/types";
import { baseFieldParser } from "./parsers/base-field-parser";
import { customOptionFieldParser } from "./parsers/custom-option-field-parser";
import { RawField, RawFieldType, RawFormData } from "./types";

const fieldTypeParsers: Record<RawFieldType, any> = {
  [RawFieldType.SHORT_ANSWER]: baseFieldParser,
  [RawFieldType.PARAGRAPH]: baseFieldParser,
  [RawFieldType.MULTIPLE_CHOICE]: customOptionFieldParser,
  [RawFieldType.CHECKBOXES]: customOptionFieldParser,
} as const;

const fieldTypeMap: Record<RawFieldType, FieldType> = {
  [RawFieldType.SHORT_ANSWER]: "SHORT_ANSWER",
  [RawFieldType.PARAGRAPH]: "PARAGRAPH",
  [RawFieldType.MULTIPLE_CHOICE]: "MULTIPLE_CHOICE",
  [RawFieldType.CHECKBOXES]: "CHECKBOXES",
} as const;

interface ParseFields {
  (rawFields: RawField[]): {
    fields: Field[];
    fieldsPositionMap: FieldsPositionMap;
  };
}

const parseFields: ParseFields = (rawFields) => {
  const fields: Field[] = [];

  const fieldsPositionMap = {} as FieldsPositionMap;

  rawFields.forEach((rawField, i) => {
    const rawFieldType = rawField[3];

    const fieldParser = fieldTypeParsers[rawFieldType];

    if (!fieldParser) {
      return;
    }

    const fieldData = fieldParser(rawField);

    fieldsPositionMap[fieldData.id] = i;

    fields.push({
      type: fieldTypeMap[rawFieldType],
      ...fieldParser(rawField),
    } as Field);
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
  googleForm.description = rawFormDataTuple[1][0];

  const { fields, fieldsPositionMap } = parseFields(rawFormDataTuple[1][1]);
  googleForm.fields = fields;
  googleForm.fieldsPositionMap = fieldsPositionMap;

  return googleForm;
};

export { parseRawFormData };
