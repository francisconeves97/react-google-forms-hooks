import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"

import { useGoogleFormContext } from "./useFormContext"

const resolveFormField = (id, form) => {
  return form.fields[id]
}

const buildCustomFieldId = (id) => {
  return `${id}-other_option_response`
}

const assertInputType = (field, fieldType) => {
  if (field.type !== fieldType) {
    throw new Error(`Field with id ${field.id} is not of type ${fieldType}. It's type is ${field.type}`)
  }
}

export const useShortAnswerInput = (id) => {
  const context = useGoogleFormContext()
  const field = context.getField(id)

  assertInputType(field, 'SHORT_ANSWER')

  const register = (options = {}) => context.register(id, { required: field.required, ...options })

  return { ...field, register }
}

export const useCheckboxInput = (id) => {
  const context = useGoogleFormContext()
  const field = context.getField(id)

  assertInputType(field, 'CHECKBOX')

  const [customInputRequired, setCustomInputRequired] = useState(false)

  const register = (options = {}) => context.register(id, { required: field.required, ...options })
  const registerCustom = (options = {}) => ({ ...register(), value: '__other_option__' })
  const registerCustomInput = (options = {}) => {
    return context.register(buildCustomFieldId(id), { required: customInputRequired})
  }

  const currentValue = context.watch(id)

  useEffect(() => {
    setCustomInputRequired(currentValue && currentValue.includes('__other_option__'))
  }, [currentValue, customInputRequired])

  return { ...field, register, registerCustom, registerCustomInput }
}

export const useRadioInput = (id) => {
  const context = useGoogleFormContext()
  const field = context.getField(id)

  assertInputType(field, 'RADIO')

  const [customInputRequired, setCustomInputRequired] = useState(false)

  const register = (options = {}) => context.register(id, { required: field.required, ...options })
  const registerCustom = (options = {}) => ({ ...register(), value: '__other_option__' })
  const registerCustomInput = (options = {}) => {
    return context.register(buildCustomFieldId(id), { required: customInputRequired})
  }

  const currentValue = context.watch(id)

  useEffect(() => {
    setCustomInputRequired(currentValue && currentValue === '__other_option__')
  }, [currentValue, customInputRequired])

  return { ...field, register, registerCustom, registerCustomInput }
}

export const useGoogleForm = ({ form }) => {
  const methods = useForm()
  const getField = (id) => resolveFormField(id, form)

  methods.getField = getField

  return methods
}