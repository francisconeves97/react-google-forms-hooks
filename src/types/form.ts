export interface Option {
  label: string
}

export interface CustomizableOption extends Option {
  custom?: boolean
}

interface BaseField {
  id: string
  label: string
  required: boolean
}

interface TextField extends BaseField {
  type: 'SHORT_ANSWER' | 'LONG_ANSWER'
}

interface CustomOptionField extends BaseField {
  type: 'CHECKBOX' | 'RADIO'
  hasCustom: boolean
  options: Array<CustomizableOption>
}

interface DropdownField extends BaseField {
  type: 'DROPDOWN'
  options: Array<Option>
}

interface Legend {
  labelFirst: string
  labelLast: string
}

interface LinearField extends BaseField {
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

interface GridField extends BaseField {
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

export interface Fields {
  [fieldId: string]: Field
}

export type GoogleForm = {
  action: string
  fvv: number
  pageHistory: number
  fbzx: string
  fields: {
    [fieldId: string]: Field
  }
}
