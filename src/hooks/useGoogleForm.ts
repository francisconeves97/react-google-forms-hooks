import { useForm } from 'react-hook-form'

import { GoogleForm, UseGoogleFormReturn } from '../types'

const resolveField = (id: string, form: GoogleForm) => {
  const fieldIndex = form.fieldsOrder[id]

  if (fieldIndex === undefined) {
    throw new Error(`Field with id ${id} wasn't found in your form`)
  }

  const field = form.fields[fieldIndex]
  return field
}

export const useGoogleForm = ({ form }: { form: GoogleForm }) => {
  const methods = useForm() as UseGoogleFormReturn

  methods.getField = (id: string) => resolveField(id, form)

  return methods
}
