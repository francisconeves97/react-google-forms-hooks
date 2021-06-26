import { useForm } from "react-hook-form"

import { useGoogleFormContext } from "./useFormContext"

const resolveFormField = (id, form) => {
  return form.fields[id]
}

export const useCheckboxInput = (id) => {
  const context = useGoogleFormContext()
  const field = context.getField(id)
  const register = (options = {}) => context.register(id, { required: field.required, ...options })

  console.log(register())

  return { ...field, register }
}

export const useGoogleForm = ({ form }) => {
  const methods = useForm()
  const getField = (id) => resolveFormField(id, form)

  methods.getField = getField

  return methods
}