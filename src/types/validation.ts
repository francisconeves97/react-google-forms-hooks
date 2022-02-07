export type LengthRule = 'MAX' | 'MIN'

export interface LengthValidation {
  type: 'LENGTH'
  rule: LengthRule
  length: number
}

export type Validation = LengthValidation

export type ValidationTypes = Validation['type']
