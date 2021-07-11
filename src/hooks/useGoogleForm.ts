import { useForm } from 'react-hook-form'
import slugify from 'slugify'

import { useGoogleFormContext } from './useGoogleFormContext'
import getFieldFromContext from './utils/getFieldFromContext'
import {
  GoogleForm,
  UseGoogleFormReturn,
  GridField,
  RegisterReturn,
  RenderLineFunction,
  RenderColumnFunction,
  UseGridReturn,
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

type UseGridFieldReturn = GridField & UseGridReturn

const useGridInput = (
  id: string,
  type: 'RADIO_GRID' | 'CHECKBOX_GRID'
): UseGridFieldReturn => {
  const context = useGoogleFormContext()

  const field = getFieldFromContext(context, id, type) as GridField

  const renderGrid = (render: RenderLineFunction): JSX.Element[] => {
    return field.lines.map((l) => {
      const registerLine = (options = {}) =>
        context!.register(l.id, { required: field.required, ...options })

      const renderColumns = (render: RenderColumnFunction): JSX.Element[] => {
        return field.columns.map((c) => {
          const registerColumn = () => ({ ...registerLine(), value: c.label })

          return render({ ...c, registerColumn })
        })
      }

      return render({ ...l, renderColumns })
    })
  }

  return { ...field, renderGrid }
}

export const useRadioGridInput = (id: string) => {
  return useGridInput(id, 'RADIO_GRID')
}

export const useCheckboxGridInput = (id: string) => {
  return useGridInput(id, 'CHECKBOX_GRID')
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
