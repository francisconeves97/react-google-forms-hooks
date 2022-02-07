import { Validation } from '../types/validation'
import { lengthValidationFactory } from './lengthValidationFactory'

export const validationFunctionFactory = (
  validation: Validation,
  isRequired: boolean
): ((arg: any) => any | undefined) => {
  let validationFn: (arg: any) => any = () => true
  if (validation.type === 'LENGTH') {
    validationFn = lengthValidationFactory
  }

  if (!isRequired) {
    return (arg: any) => !arg || validationFn(arg)
  }

  return validationFn
}
