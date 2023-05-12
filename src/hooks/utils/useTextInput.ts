import { RegisterOptions } from 'react-hook-form'

import { UseTextFieldReturn, TextField } from '../../types'
import { useGoogleFormContext } from '../useGoogleFormContext'
import getFieldFromContext from './getFieldFromContext'

export default (
  id: string,
  fieldType: 'LONG_ANSWER' | 'SHORT_ANSWER' | 'DATE' | 'TIME',
): UseTextFieldReturn => {
  const context = useGoogleFormContext()

  const field = getFieldFromContext(context, id, fieldType) as TextField

  const error = context!.formState.errors[field.id]

  const register = (options?: RegisterOptions) =>
    context!.register(id, { required: field.required, ...options })

  return { ...field, register, error }
}
