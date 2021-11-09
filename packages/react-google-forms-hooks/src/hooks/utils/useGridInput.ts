import { useEffect, useState } from 'react'
import { RegisterOptions } from 'react-hook-form'
import slugify from 'slugify'

import { useGoogleFormContext } from '../useGoogleFormContext'
import getFieldFromContext from './getFieldFromContext'
import {
  UseGridFieldReturn,
  GridField,
  RenderLineFunction,
  RenderColumnFunction,
  GridErrors
} from '../../types'

export default (
  id: string,
  type: 'RADIO_GRID' | 'CHECKBOX_GRID'
): UseGridFieldReturn => {
  const context = useGoogleFormContext()
  const [errors, setErrors] = useState<GridErrors | undefined>(undefined)

  const field = getFieldFromContext(context, id, type) as GridField

  const buildId = (lineId: string, value: string) => {
    return `${id}-${lineId}-${slugify(value)}`
  }

  useEffect(() => {
    const newErrors: GridErrors = field.lines.reduce((acc: GridErrors, l) => {
      const fieldError = context!.formState.errors[l.id]
      if (fieldError) {
        acc[l.id] = fieldError
      }
      return acc
    }, {})

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
    } else {
      setErrors(undefined)
    }
  }, [context!.formState.errors])

  const renderGrid = (render: RenderLineFunction): JSX.Element[] => {
    return field.lines.map((l) => {
      const registerLine = (options?: RegisterOptions) =>
        context!.register(l.id, { required: field.required, ...options })

      const renderColumns = (render: RenderColumnFunction): JSX.Element[] => {
        return field.columns.map((c) => {
          const id = buildId(l.id, c.label)
          const registerColumn = (options?: RegisterOptions) => ({
            ...registerLine(options),
            value: c.label
          })

          return render({ ...c, registerColumn, id })
        })
      }

      return render({ ...l, renderColumns })
    })
  }

  return { ...field, renderGrid, errors }
}
