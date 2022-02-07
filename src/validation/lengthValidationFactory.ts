import { LengthValidation } from '../types/validation'

const LENGTH_VALIDATION_FUNCTIONS = {
  MAX: (arg: number) => (v: string) => v.length < arg,
  MIN: (arg: number) => (v: string) => v.length > arg
}

export const lengthValidationFactory = (validation: LengthValidation) => {
  const validationFnBuilder = LENGTH_VALIDATION_FUNCTIONS[validation.rule]
  return validationFnBuilder(validation.length)
}
