import { useGoogleFormContext } from './useGoogleFormContext'
import getFieldFromContext from './utils/getFieldFromContext'
import { UseDropdownReturn, DropdownField } from '../types'

export const useDropdownInput = (id: string): UseDropdownReturn => {
  const context = useGoogleFormContext()

  const field = getFieldFromContext(context, id, 'DROPDOWN') as DropdownField

  const register = (options = {}) =>
    context!.register(id, { required: field.required, ...options })

  return { ...field, register }
}
