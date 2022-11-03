import { BaseField } from "@google-forms-js/types";

export type BooleanNumber = 0 | 1;

export type RawFieldType = 0 | 1;

export type RawTextField = [
  _: number,
  label: string,
  description: string | null,
  fieldTypeId: 0 | 1,
  fieldInfoArray: [fieldInfo: [id: number, _: null, isRequired: BooleanNumber]]
];

export type RawField = RawTextField;

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

export interface RawFieldParser<T extends RawField, K extends BaseField> {
  (rawField: T): K;
}
