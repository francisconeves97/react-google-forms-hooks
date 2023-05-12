import { UseTextFieldReturn } from '../types'
import useTextInput from './utils/useTextInput'

export const useTimeInput = (id: string): UseTextFieldReturn => {
  return useTextInput(id, 'TIME')
}
