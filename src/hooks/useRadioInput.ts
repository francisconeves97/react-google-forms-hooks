import useCustomOptionField from './utils/useCustomOptionField'
import { UseCustomOptionField } from '../types'

export const useRadioInput = (id: string): UseCustomOptionField => {
  return useCustomOptionField(id, 'RADIO')
}
