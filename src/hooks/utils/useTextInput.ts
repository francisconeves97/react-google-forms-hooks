import { RegisterOptions } from 'react-hook-form'

import { UseTextFieldReturn, TextField } from '../../types'
import { validationFunctionFactory } from '../../validation/validationFunctionFactory'
import { useGoogleFormContext } from '../useGoogleFormContext'
import getFieldFromContext from './getFieldFromContext'

export default (
  id: string,
  fieldType: 'LONG_ANSWER' | 'SHORT_ANSWER'
): UseTextFieldReturn => {
  const context = useGoogleFormContext()

  const field = getFieldFromContext(context, id, fieldType) as TextField

  const error = context!.formState.errors[field.id]

  const register = (options?: RegisterOptions) => {
    let validateFn: ((args: any) => any) | undefined = undefined

    if (field.validation) {
      validateFn = validationFunctionFactory(field.validation, field.required)
    }

    return context!.register(id, {
      required: field.required,
      validate: validateFn,
      ...options
    })
  }

  return { ...field, register, error }
}
