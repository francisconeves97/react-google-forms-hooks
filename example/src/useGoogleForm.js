import { useForm } from "react-hook-form"

import { useGoogleFormContext } from "./useFormContext"

const resolveFormField = (id, form) => {
  return form.fields[id]
}

const buildCustomFieldId = (id) => {
  return `${id}-other_option_response`
}

export const useCheckboxInput = (id) => {
  const context = useGoogleFormContext()
  const field = context.getField(id)
  const register = (options = {}) => context.register(id, { required: field.required, ...options })
  const registerCustom = (options = {}) => ({ ...register(), value: '__other_option__' })
  const registerCustomInput = (options = {}) => {
    return context.register(buildCustomFieldId(id), { validate: (v) => {
      return !context.getValues(id).includes('__other_option__') || v.length > 0 
    }})
  }

  return { ...field, register, registerCustom, registerCustomInput }
}

export const useGoogleForm = ({ form }) => {
  const methods = useForm()
  const getField = (id) => resolveFormField(id, form)

  methods.getField = getField

  return methods
}