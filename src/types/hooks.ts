import {
  UseFormReturn,
  UseFormRegisterReturn,
  RegisterOptions
} from 'react-hook-form'

import {
  Column,
  Field,
  Line,
  Option,
  BaseField,
  TextField,
  GridField
} from './form'

type GetField = (id: string) => Field

type GetFieldReturn = {
  getField: GetField
}

export type UseGoogleFormReturn = UseFormReturn & GetFieldReturn

export type RegisterReturn = {
  register: (options: RegisterOptions) => UseFormRegisterReturn
}

export type OptionRegister = Option & {
  id: string
  registerOption: (options: RegisterOptions) => UseFormRegisterReturn
}

export type CustomOptionRegister = OptionRegister & {
  registerCustomInput: (options: RegisterOptions) => UseFormRegisterReturn
}

export type UseCustomOptionReturn = {
  options: Array<OptionRegister>
  customOption?: CustomOptionRegister
}

export type UseOptionReturn = {
  options: Array<OptionRegister>
}

export type LineRenderer = Line & {
  renderColumns: (render: RenderColumnFunction) => JSX.Element[]
}
export type ColumnRenderer = Column & {
  registerColumn: () => UseFormRegisterReturn
}

export type RenderLineFunction = (line: LineRenderer) => JSX.Element
export type RenderColumnFunction = (column: ColumnRenderer) => JSX.Element

export type UseGridReturn = {
  renderGrid: (render: RenderLineFunction) => JSX.Element[]
}

export type UseCustomOptionField = BaseField & UseCustomOptionReturn

export type UseTextFieldReturn = TextField & RegisterReturn

export type UseGridFieldReturn = GridField & UseGridReturn
