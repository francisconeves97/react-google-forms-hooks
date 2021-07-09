import { UseFormReturn } from 'react-hook-form'
import { GoogleForm, Field } from './form'

type GetField = (id: string) => (id: string, form: GoogleForm) => Field

type GetFieldReturn = {
  getField: GetField
}

export type UseGoogleFormReturn = UseFormReturn | GetFieldReturn
