import { BaseField, CustomOptionField, Field } from "@google-forms-js/types";

export type BooleanNumber = 0 | 1;

export enum RawFieldType {
  SHORT_ANSWER = 0,
  PARAGRAPH = 1,
  MULTIPLE_CHOICE = 2,
  DROPDOWN = 3,
  CHECKBOXES = 4,
}

export type RawTextField = [
  _: number,
  label: string,
  description: string | null,
  fieldTypeId: RawFieldType.SHORT_ANSWER | RawFieldType.PARAGRAPH,
  fieldInfoArray: [fieldInfo: [id: number, _: null, isRequired: BooleanNumber]]
];

export type RawCustomOptionField = [
  _: number,
  label: string,
  description: string | null,
  fieldTypeId: RawFieldType.MULTIPLE_CHOICE | RawFieldType.CHECKBOXES,
  fieldInfoArray: [
    fieldInfo: [
      id: number,
      optionsArray: [
        option: [
          label: string,
          _: null,
          _: null,
          _: null,
          isCustomOption: BooleanNumber
        ]
      ],
      isRequired: BooleanNumber
    ]
  ]
];

export type RawField = RawTextField | RawCustomOptionField;

export type RawFormDataTuple = [
  _: null,
  _: [
    description: string | null,
    fields: RawField[],
    _: null,
    _: null,
    _: null,
    _: [_: number, _: number],
    _: null,
    _: null,
    title: string
  ],
  _: string,
  _: string,
  _: null,
  _: null,
  _: null,
  _: string,
  _: null,
  _: number,
  _: number,
  _: null,
  _: string,
  _: number,
  action: string
];

export interface RawFormData {
  rawFormDataTuple: RawFormDataTuple;
  fbzx: string;
}

export interface RawFieldParser<T extends RawField> {
  (rawField: T): BaseField | CustomOptionField;
}
