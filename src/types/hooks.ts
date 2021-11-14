import {
  UseFormReturn,
  UseFormRegisterReturn,
  RegisterOptions,
  FieldError
} from 'react-hook-form'

import {
  Column,
  Field,
  Line,
  Option,
  BaseField,
  TextField,
  GridField,
  DropdownField,
  LinearField
} from './form'

export type GetField = (id: string) => Field

export type UseGoogleFormReturn = UseFormReturn & {
  getField: GetField
  submitToGoogleForms: (form: FormData) => Promise<boolean>
}

export type RegisterReturn = {
  register: (options?: RegisterOptions) => UseFormRegisterReturn
}

export type OptionId = Option & {
  id: string
}

export type OptionRegister = OptionId & {
  registerOption: (options?: RegisterOptions) => UseFormRegisterReturn
}

export type CustomOptionRegister = OptionRegister & {
  registerCustomInput: (options?: RegisterOptions) => UseFormRegisterReturn
} & Error

export type UseCustomOptionReturn = {
  options: Array<OptionRegister>
  customOption?: CustomOptionRegister
  isCustomOptionSelected?: boolean
}

export type Options = {
  options: Array<OptionId>
}

export type UseOptionReturn = {
  options: Array<OptionRegister>
}

export type LineRenderer = Line & {
  renderColumns: (render: RenderColumnFunction) => JSX.Element[]
}
export type ColumnRenderer = Column & {
  registerColumn: (options?: RegisterOptions) => UseFormRegisterReturn
} & { id: string }

export type RenderLineFunction = (line: LineRenderer) => JSX.Element
export type RenderColumnFunction = (column: ColumnRenderer) => JSX.Element

export type UseGridReturn = {
  renderGrid: (render: RenderLineFunction) => JSX.Element[]
}

export type Error = {
  error?: FieldError
}

export type GridErrors = {
  [fieldId: string]: FieldError
}

export type Errors = {
  errors?: GridErrors
}

export type UseCustomOptionField = BaseField & UseCustomOptionReturn & Error

export type UseTextFieldReturn = TextField & RegisterReturn & Error

export type UseGridFieldReturn = GridField & UseGridReturn & Errors

export type UseDropdownReturn = Options & DropdownField & RegisterReturn & Error

export type UseLinearInputReturn = UseOptionReturn & LinearField & Error
