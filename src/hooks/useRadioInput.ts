import useCustomOptionField from './utils/useCustomOptionField'
import { UseCustomOptionField } from '../types'

export const useCheckboxInput = (id: string): UseCustomOptionField => {
  return useCustomOptionField(id, 'RADIO')
}
