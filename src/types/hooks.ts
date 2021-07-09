import {
  UseFormReturn,
  UseFormRegisterReturn,
  RegisterOptions
} from 'react-hook-form'
import { Field } from './form'

type GetField = (id: string) => Field

type GetFieldReturn = {
  getField: GetField
}

export type UseGoogleFormReturn = UseFormReturn & GetFieldReturn

export type UseCustomOptionReturn = {
  register: (options: RegisterOptions) => UseFormRegisterReturn
  registerCustom: (options: RegisterOptions) => UseFormRegisterReturn
  registerCustomInput: (options: RegisterOptions) => UseFormRegisterReturn
}
