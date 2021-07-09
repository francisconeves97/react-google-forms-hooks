import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { useGoogleFormContext } from './useGoogleFormContext'
import {
  GoogleForm,
  UseCustomOptionReturn,
  UseGoogleFormReturn,
  CustomOptionField,
  FieldTypes
} from '../types'

const resolveField = (id: string, form: GoogleForm) => {
  return form.fields[id]
}

export const useGoogleForm = ({ form }: { form: GoogleForm }) => {
  const methods = useForm() as UseGoogleFormReturn

  methods.getField = (id: string) => resolveField(id, form)

  return methods
}

const buildCustomFieldId = (id: string) => {
  return `${id}-other_option_response`
}

type UseCustomOptionField = CustomOptionField & UseCustomOptionReturn

const getFieldFromContext = (
  context: UseGoogleFormReturn,
  id: string,
  type: FieldTypes
) => {
  const field = context.getField(id)

  // can't put this in a function because control flow for typescript doesnt work this way
  if (field.type !== type) {
    throw new Error(`Field with id ${field.id} is not of type ${type}`)
  }

  return field
}

const useCustomOption = (
  context: UseGoogleFormReturn,
  field: CustomOptionField
): UseCustomOptionReturn => {
  const [customInputRequired, setCustomInputRequired] = useState<boolean>(false)
  const { id } = field

  const register = (options = {}) =>
    context.register(id, { required: field.required, ...options })
  const registerCustom = (options = {}) => ({
    ...register(options),
    value: '__other_option__'
  })
  const registerCustomInput = (options = {}) => {
    return context.register(buildCustomFieldId(id), {
      required: customInputRequired,
      ...options
    })
  }

  const currentValue = context.watch(id)

  useEffect(() => {
    setCustomInputRequired(currentValue && currentValue === '__other_option__')
  }, [currentValue, customInputRequired])

  return { register, registerCustom, registerCustomInput }
}

export const useCheckboxInput = (id: string): UseCustomOptionField => {
  const context = useGoogleFormContext()

  if (context === null) {
    throw new Error('You need to wrap your form with a GoogleFormProvider')
  }

  const field = getFieldFromContext(
    context,
    id,
    'CHECKBOX'
  ) as CustomOptionField

  const { register, registerCustom, registerCustomInput } = useCustomOption(
    context,
    field
  )

  return {
    ...(field as CustomOptionField),
    register,
    registerCustom,
    registerCustomInput
  }
}

export const useRadioInput = (id: string): UseCustomOptionField => {
  const context = useGoogleFormContext()

  if (context === null) {
    throw new Error('You need to wrap your form with a GoogleFormProvider')
  }

  const field = getFieldFromContext(context, id, 'RADIO') as CustomOptionField

  const { register, registerCustom, registerCustomInput } = useCustomOption(
    context,
    field
  )

  return {
    ...(field as CustomOptionField),
    register,
    registerCustom,
    registerCustomInput
  }
}
