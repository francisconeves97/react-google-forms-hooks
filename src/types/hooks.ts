import {
  UseFormReturn,
  UseFormRegisterReturn,
  RegisterOptions
} from 'react-hook-form'
import { Column, Field, Line, Option } from './form'

type GetField = (id: string) => Field | undefined

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

export type LineRenderer = Line & {
  renderColumns: (render: RenderColumnFunction) => JSX.Element[]
}
export type ColumnRenderer = Column & {
  registerColumn: () => UseFormRegisterReturn
}

export type RenderLineFunction = (line: LineRenderer) => JSX.Element
export type RenderColumnFunction = (column: ColumnRenderer) => JSX.Element

export type UseGridReturn = RegisterReturn & {
  renderGrid: (render: RenderLineFunction) => JSX.Element[]
}
