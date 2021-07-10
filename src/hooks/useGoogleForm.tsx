import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { useGoogleFormContext } from './useGoogleFormContext'
import {
  GoogleForm,
  UseCustomOptionReturn,
  UseGoogleFormReturn,
  CustomOptionField,
  FieldTypes,
  TextField,
  GridField,
  RegisterReturn,
  RenderLineFunction,
  RenderColumnFunction,
  UseGridReturn
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
  context: UseGoogleFormReturn | null,
  id: string,
  type: FieldTypes
) => {
  if (context === null) {
    throw new Error('You need to wrap your form with a GoogleFormProvider')
  }

  const field = context.getField(id)

  if (field === undefined) {
    throw new Error(`Field with id ${id} wasn't found in your form`)
  }

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
  const id = field.id

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

  const field = getFieldFromContext(
    context,
    id,
    'CHECKBOX'
  ) as CustomOptionField

  const { register, registerCustom, registerCustomInput } = useCustomOption(
    context!,
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

  const field = getFieldFromContext(context, id, 'RADIO') as CustomOptionField

  const { register, registerCustom, registerCustomInput } = useCustomOption(
    context!,
    field
  )

  return {
    ...(field as CustomOptionField),
    register,
    registerCustom,
    registerCustomInput
  }
}

type UseTextFieldReturn = TextField & RegisterReturn

const useTextInput = (
  id: string,
  fieldType: 'LONG_ANSWER' | 'SHORT_ANSWER'
): UseTextFieldReturn => {
  const context = useGoogleFormContext()

  const field = getFieldFromContext(context, id, fieldType) as TextField

  const register = (options = {}) =>
    context!.register(id, { required: field.required, ...options })

  return { ...field, register }
}

export const useLongAnswerInput = (id: string) => {
  return useTextInput(id, 'LONG_ANSWER')
}

export const useShortAnswerInput = (id: string) => {
  return useTextInput(id, 'SHORT_ANSWER')
}

type UseGridFieldReturn = UseGridReturn & RegisterReturn

const useGridInput = (
  id: string,
  type: 'RADIO_GRID' | 'CHECKBOX_GRID'
): UseGridFieldReturn => {
  const context = useGoogleFormContext()

  const field = getFieldFromContext(context, id, type) as GridField

  const register = (options = {}) =>
    context!.register(id, { required: field.required, ...options })

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

  return { ...field, register, renderGrid }
}

export const useRadioGridInput = (id: string) => {
  return useGridInput(id, 'RADIO_GRID')
}

export const useCheckboxGridInput = (id: string) => {
  return useGridInput(id, 'CHECKBOX_GRID')
}
