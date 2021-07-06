const textFields = ['SHORT_ANSWER', 'LONG_ANSWER'] as const
type TextFieldType = typeof textFields[number]

const customOptionFields = ['CHECKBOX', 'RADIO'] as const
type CustomOptionFieldType = typeof customOptionFields[number]

const fieldTypes = [
  'LINEAR',
  'DROPDOWN',
  'CHECKBOX_GRID',
  'RADIO_GRID'
] as const

interface Option {
  label: string
}

interface CustomizableOption extends Option {
  custom?: boolean
}

interface BaseField {
  id: string
  label: string
  required: boolean
}

interface TextField extends BaseField {
  type: TextFieldType
}

interface CustomOptionField extends BaseField {
  type: CustomOptionFieldType
  hasCustom: boolean
  options: Array<CustomizableOption>
}

interface DropdownField extends BaseField {
  type: 'DROPDOWN'
  options: Array<Option>
}

export type GoogleForm = {
  action: string
  fvv: string
  pageHistory: string
  fbzx: string
  fields: {
    [fieldId: string]: TextField | CustomOptionField | DropdownField
  }
}

const form: GoogleForm = {
  action: 'asd',
  fvv: 'asd',
  pageHistory: 'asd',
  fbzx: 'asd',
  fields: {
    adsad: {
      id: 'asd',
      label: 'asd',
      required: false,
      type: 'SHORT_ANSWER'
    }
  }
}
