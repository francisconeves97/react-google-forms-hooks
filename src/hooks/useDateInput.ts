import { UseTextFieldReturn } from '../types'
import useTextInput from './utils/useTextInput'

export const useDateInput = (id: string): UseTextFieldReturn => {
  return useTextInput(id, 'DATE')
}
