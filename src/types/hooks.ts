import { UseFormReturn } from 'react-hook-form'
import { Field } from './form'

type GetField = (id: string) => Field

type GetFieldReturn = {
  getField: GetField
}

export type UseGoogleFormReturn = UseFormReturn & GetFieldReturn
