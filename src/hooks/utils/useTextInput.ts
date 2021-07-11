import { UseTextFieldReturn, TextField } from '../../types'
import { useGoogleFormContext } from '../useGoogleFormContext'
import getFieldFromContext from './getFieldFromContext'

export default (
  id: string,
  fieldType: 'LONG_ANSWER' | 'SHORT_ANSWER'
): UseTextFieldReturn => {
  const context = useGoogleFormContext()

  const field = getFieldFromContext(context, id, fieldType) as TextField

  const register = (options = {}) =>
    context!.register(id, { required: field.required, ...options })

  return { ...field, register }
}
