import { useGoogleFormContext } from './useGoogleFormContext'
import getFieldFromContext from './utils/getFieldFromContext'
import useCustomOptionField from './utils/useCustomOptionField'
import { CustomOptionField, UseCustomOptionField, BaseField } from '../types'

export const useRadioInput = (id: string): UseCustomOptionField => {
  const context = useGoogleFormContext()

  const field = getFieldFromContext(context, id, 'RADIO') as CustomOptionField

  const customOption = useCustomOptionField(context!, field)

  return {
    ...(field as BaseField),
    ...customOption
  }
}
