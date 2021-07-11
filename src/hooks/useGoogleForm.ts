import { useForm } from 'react-hook-form'
import slugify from 'slugify'

import { useGoogleFormContext } from './useGoogleFormContext'
import getFieldFromContext from './utils/getFieldFromContext'
import {
  GoogleForm,
  UseGoogleFormReturn,
  RegisterReturn,
  DropdownField,
  LinearField,
  UseOptionReturn
} from '../types'

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

type UseDropdownReturn = DropdownField & RegisterReturn

export const useDropdownInput = (id: string): UseDropdownReturn => {
  const context = useGoogleFormContext()

  const field = getFieldFromContext(context, id, 'DROPDOWN') as DropdownField

  const register = (options = {}) =>
    context!.register(id, { required: field.required, ...options })

  return { ...field, register }
}

type UseLinearInputReturn = UseOptionReturn & LinearField

export const useLinearInput = (id: string): UseLinearInputReturn => {
  const context = useGoogleFormContext()

  const field = getFieldFromContext(context, id, 'LINEAR') as LinearField

  const register = (options = {}) =>
    context!.register(id, { required: field.required, ...options })

  const buildId = (value: string) => {
    return `${field.id}-${slugify(value)}`
  }

  const options = field.options.map((o) => {
    const id = buildId(o.label)
    const registerOption = (options = {}) => ({
      ...register(options),
      value: o.label
    })

    return {
      ...o,
      id,
      registerOption
    }
  })

  return { ...field, options }
}
