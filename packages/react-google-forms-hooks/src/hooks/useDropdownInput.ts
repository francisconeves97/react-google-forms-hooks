import slugify from 'slugify'

import { useGoogleFormContext } from './useGoogleFormContext'
import getFieldFromContext from './utils/getFieldFromContext'
import { UseDropdownReturn, DropdownField } from '../types'
import { RegisterOptions } from 'react-hook-form'

export const useDropdownInput = (id: string): UseDropdownReturn => {
  const context = useGoogleFormContext()

  const field = getFieldFromContext(context, id, 'DROPDOWN') as DropdownField

  const register = (options?: RegisterOptions) =>
    context!.register(id, { required: field.required, ...options })

  const error = context!.formState.errors[field.id]

  const buildId = (value: string) => {
    return `${field.id}-${slugify(value)}`
  }

  const options = field.options.map((o) => {
    const id = buildId(o.label)
    return {
      ...o,
      id
    }
  })

  return { ...field, options, register, error }
}
