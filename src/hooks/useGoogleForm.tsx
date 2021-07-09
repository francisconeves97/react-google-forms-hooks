import { useState, useEffect } from 'react'
import {
  useForm,
  UseFormRegisterReturn,
  RegisterOptions
} from 'react-hook-form'

import { useGoogleFormContext } from './useGoogleFormContext'
import {
  GoogleForm,
  Field,
  UseGoogleFormReturn,
  CustomOptionField
} from '../types'

const resolveField = (id: string, form: GoogleForm) => {
  return form.fields[id]
}

export const useGoogleForm = ({ form }: { form: GoogleForm }) => {
  const methods = useForm() as UseGoogleFormReturn

  methods.getField = (id: string) => resolveField(id, form)

  return methods
}

const throwWrongFieldError = (field: Field, type: string) => {
  throw new Error(`Field with id ${field.id} is not of type ${type}`)
}

const buildCustomFieldId = (id: string) => {
  return `${id}-other_option_response`
}

type UseCustomOptionField = CustomOptionField & {
  register: (options: RegisterOptions) => UseFormRegisterReturn
  registerCustom: (options: RegisterOptions) => UseFormRegisterReturn
  registerCustomInput: (options: RegisterOptions) => UseFormRegisterReturn
}

export const useRadioInput = (id: string): UseCustomOptionField => {
  const context = useGoogleFormContext()

  if (context === null) {
    throw new Error('You need to wrap your form with a GoogleFormProvider')
  }

  const field = context.getField(id)

  // can't put this in a function because control flow for typescript doesnt work this way
  if (field.type !== 'RADIO') {
    throwWrongFieldError(field, 'RADIO')
  }

  const [customInputRequired, setCustomInputRequired] = useState<boolean>(false)

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

  return {
    ...(field as CustomOptionField),
    register,
    registerCustom,
    registerCustomInput
  }
}
