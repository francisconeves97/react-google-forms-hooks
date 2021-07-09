import { useForm } from 'react-hook-form'
import { GoogleForm } from '../types'
import { UseGoogleFormReturn } from '../types/hooks'

const resolveField = (id: string, form: GoogleForm) => {
  return form.fields[id]
}

export const useGoogleForm = ({ form }: { form: GoogleForm }) => {
  const methods = useForm() as UseGoogleFormReturn

  methods.getField = (id: string) => resolveField(id, form)

  return methods
}
