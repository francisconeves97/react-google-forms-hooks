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

const OTHER_OPTION = '__other_option__'

const buildCustomFieldId = (id: string) => {
  return `${id}-other_option_response`
}

export default (
  id: string,
  type: 'CHECKBOX' | 'RADIO'
): UseCustomOptionField => {
  const context = useGoogleFormContext()
  const field = getFieldFromContext(context, id, type) as CustomOptionField

  const [customInputRequired, setCustomInputRequired] = useState<boolean>(false)

  const register = (options?: RegisterOptions) =>
    context!.register(id, { required: field.required, ...options })

  const currentValue = context!.watch(id)

  useEffect(() => {
    if (field.type === 'RADIO') {
      setCustomInputRequired(currentValue && currentValue === OTHER_OPTION)
    } else if (field.type === 'CHECKBOX') {
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
    const registerCustomInput = (options = {}) => {
      return context!.register(buildCustomFieldId(id), {
        required: customInputRequired,
        ...options
      })
    }

    const error = context!.formState.errors[id]

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
    error
  }
}
