import slugify from 'slugify'
import { RegisterOptions } from 'react-hook-form'

import { useGoogleFormContext } from './useGoogleFormContext'
import getFieldFromContext from './utils/getFieldFromContext'
import { UseLinearInputReturn, LinearField } from '../types'

export const useLinearInput = (id: string): UseLinearInputReturn => {
  const context = useGoogleFormContext()

  const field = getFieldFromContext(context, id, 'LINEAR') as LinearField

  const register = (options?: RegisterOptions) =>
    context!.register(id, { required: field.required, ...options })

  const buildId = (value: string) => {
    return `${field.id}-${slugify(value)}`
  }

  const error = context!.formState.errors[field.id]

  const options = field.options.map((o) => {
    const id = buildId(o.label)
    const registerOption = (options?: RegisterOptions) => ({
      ...register(options),
      value: o.label
    })

    return {
      ...o,
      id,
      registerOption
    }
  })

  return { ...field, options, error }
}
