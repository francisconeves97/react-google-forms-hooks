import {
  GoogleForm,
  FieldType,
  FieldsPositionMap,
  BaseField,
  Field,
} from "@google-forms-js/types";
import { textFieldParser } from "./parsers/text-field-parser";
import { RawField, RawFieldType, RawFieldParser, RawFormData } from "./types";

const fieldTypeParsers: Record<
  RawFieldType,
  RawFieldParser<RawField, BaseField>
> = {
  0: textFieldParser,
  1: textFieldParser,
};

const fieldTypeMap: Record<RawFieldType, FieldType> = {
  0: "SHORT_ANSWER",
  1: "LONG_ANSWER",
};

interface ParseFields {
  (rawFields: RawField[]): {
    fields: Field[];
    fieldsPositionMap: FieldsPositionMap;
  };
}

const parseFields: ParseFields = (rawFields) => {
  const fieldsPositionMap = {} as FieldsPositionMap;

  const fields = rawFields.map((rawField, i) => {
    const rawFieldType = rawField[3];

    const fieldParser = fieldTypeParsers[rawFieldType];
    const fieldData = fieldParser(rawField);

    fieldsPositionMap[fieldData.id] = i;

    return {
      type: fieldTypeMap[rawFieldType],
      ...fieldParser(rawField),
    } as Field;
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
