import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import slugify from 'slugify'

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
  UseGridReturn,
  Option,
  BaseField
} from '../types'

const resolveField = (id: string, form: GoogleForm) => {
  const fieldIndex = form.fieldsOrder[id]
  return form.fields[fieldIndex]
}

export const useGoogleForm = ({ form }: { form: GoogleForm }) => {
  const methods = useForm() as UseGoogleFormReturn

  methods.getField = (id: string) => resolveField(id, form)

  return methods
}

const buildCustomFieldId = (id: string) => {
  return `${id}-other_option_response`
}

type UseCustomOptionField = BaseField & UseCustomOptionReturn

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

  if (field.type !== type) {
    throw new Error(`Field with id ${field.id} is not of type ${type}`)
  }

  return field
}

const OTHER_OPTION = '__other_option__'

const useCustomOption = (
  context: UseGoogleFormReturn,
  field: CustomOptionField
): UseCustomOptionReturn => {
  const [customInputRequired, setCustomInputRequired] = useState<boolean>(false)
  const id = field.id

  const register = (options = {}) =>
    context.register(id, { required: field.required, ...options })

  const currentValue = context.watch(id)

  useEffect(() => {
    if (field.type === 'RADIO') {
      setCustomInputRequired(currentValue && currentValue === OTHER_OPTION)
    } else {
      setCustomInputRequired(
        currentValue &&
          currentValue.length === 1 &&
          currentValue.includes(OTHER_OPTION)
      )
    }
  }, [currentValue, customInputRequired])

  const nonCustomOptions = field.options.filter(
    (o) => !o.custom
  ) as Array<Option>

  const buildId = (value: string) => {
    return `${id}-${slugify(value)}`
  }

  const buildOptionRegister = (o: Option) => {
    const id = buildId(o.label)
    const registerOption = (options = {}) => ({
      ...register({ ...options }),
      value: o.label
    })

    return {
      ...o,
      id,
      registerOption
    }
  }

  const result = {
    options: nonCustomOptions.map(buildOptionRegister)
  } as UseCustomOptionReturn

  const customOption = field.options.find((o) => o.custom) as Option
  if (customOption) {
    const id = buildId(OTHER_OPTION)
    const registerOption = (options = {}) => ({
      ...register({ ...options }),
      value: OTHER_OPTION
    })
    const registerCustomInput = (options = {}) => {
      return context.register(buildCustomFieldId(id), {
        required: customInputRequired,
        ...options
      })
    }

    result.customOption = {
      ...customOption,
      id,
      registerOption,
      registerCustomInput
    }
  }

  return result
}

export const useCheckboxInput = (id: string): UseCustomOptionField => {
  const context = useGoogleFormContext()

  const field = getFieldFromContext(
    context,
    id,
    'CHECKBOX'
  ) as CustomOptionField

  const customOption = useCustomOption(context!, field)

  return {
    ...(field as BaseField),
    ...customOption
  }
}

export const useRadioInput = (id: string): UseCustomOptionField => {
  const context = useGoogleFormContext()

  const field = getFieldFromContext(context, id, 'RADIO') as CustomOptionField

  const customOption = useCustomOption(context!, field)

  return {
    ...(field as BaseField),
    ...customOption
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
