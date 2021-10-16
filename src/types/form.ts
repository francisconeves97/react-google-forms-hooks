export interface Option {
  label: string
}

export interface CustomizableOption extends Option {
  custom?: boolean
}

export interface BaseField {
  id: string
  label: string
  required: boolean
}

export interface TextField extends BaseField {
  type: 'SHORT_ANSWER' | 'LONG_ANSWER'
}

export interface DateField extends BaseField {
  type: 'DATE'
  year: boolean
  hour: boolean
}

export interface CustomOptionField extends BaseField {
  type: 'CHECKBOX' | 'RADIO'
  options: Array<CustomizableOption>
}

export interface DropdownField extends BaseField {
  type: 'DROPDOWN'
  options: Array<Option>
}

interface Legend {
  labelFirst: string
  labelLast: string
}

export interface LinearField extends BaseField {
  type: 'LINEAR'
  options: Array<Option>
  legend: Legend
}

export interface Column {
  label: string
}

export interface Line {
  id: string
  label: string
}

export interface GridField extends BaseField {
  type: 'RADIO_GRID' | 'CHECKBOX_GRID'
  columns: Array<Column>
  lines: Array<Line>
}

export type Field =
  | TextField
  | CustomOptionField
  | DropdownField
  | GridField
  | LinearField
  | DateField

export type FieldTypes = Field['type']

export type FieldsOrder = {
  [fieldId: string]: number
}

export type GoogleForm = {
  action: string
  fvv: number
  pageHistory: number
  fbzx: string
  fields: Array<Field>
  fieldsOrder: FieldsOrder
}
