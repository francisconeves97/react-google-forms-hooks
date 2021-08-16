import { useState, useEffect } from 'react'
import slugify from 'slugify'

import {
  UseCustomOptionReturn,
  Option,
  BaseField,
  UseCustomOptionField,
  CustomOptionField
} from '../../types'
import getFieldFromContext from './getFieldFromContext'
import { useGoogleFormContext } from '../useGoogleFormContext'
import { RegisterOptions } from 'react-hook-form'

export const OTHER_OPTION = '__other_option__'
export const OTHER_OPTION_RESPONSE = 'other_option_response'

export const buildCustomFieldId = (id: string) => {
  return `${id}-${OTHER_OPTION_RESPONSE}`
}

export default (
  id: string,
  type: 'CHECKBOX' | 'RADIO'
): UseCustomOptionField => {
  const context = useGoogleFormContext()
  const field = getFieldFromContext(context, id, type) as CustomOptionField

  const [isCustomOptionSelected, setIsCustomOptionSelected] =
    useState<boolean>(false)
  const [customInputRequired, setCustomInputRequired] = useState<boolean>(false)

  const register = (options?: RegisterOptions) =>
    context!.register(id, { required: field.required, ...options })

  const currentValue = context!.watch(id)

  useEffect(() => {
    if (field.type === 'RADIO') {
      const isCustomOptionSelected =
        currentValue && currentValue === OTHER_OPTION
      setCustomInputRequired(field.required && isCustomOptionSelected)
      setIsCustomOptionSelected(isCustomOptionSelected)
    } else {
      const isCustomOptionSelected =
        currentValue &&
        currentValue.length === 1 &&
        currentValue.includes(OTHER_OPTION)
      setCustomInputRequired(field.required && isCustomOptionSelected)
      setIsCustomOptionSelected(isCustomOptionSelected)
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
    const registerOption = (options: RegisterOptions) => ({
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

    const customOptionId = buildCustomFieldId(id)

    const registerCustomInput = (options = {}) => {
      return context!.register(customOptionId, {
        required: customInputRequired,
        ...options
      })
    }

    const error = context!.formState.errors[customOptionId]

    result.customOption = {
      ...customOption,
      id,
      registerOption,
      registerCustomInput,
      error
    }
  }

  const error = context!.formState.errors[field.id]

  return {
    ...(field as BaseField),
    ...result,
    error,
    isCustomOptionSelected
  }
}
