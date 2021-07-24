import { useGoogleFormContext } from '../useGoogleFormContext'
import getFieldFromContext from './getFieldFromContext'

import {
  UseGridFieldReturn,
  GridField,
  RenderLineFunction,
  RenderColumnFunction
} from '../../types'
import { RegisterOptions } from 'react-hook-form'

export default (
  id: string,
  type: 'RADIO_GRID' | 'CHECKBOX_GRID'
): UseGridFieldReturn => {
  const context = useGoogleFormContext()

  const field = getFieldFromContext(context, id, type) as GridField

  const renderGrid = (render: RenderLineFunction): JSX.Element[] => {
    return field.lines.map((l) => {
      const registerLine = (options?: RegisterOptions) =>
        context!.register(l.id, { required: field.required, ...options })

      const renderColumns = (render: RenderColumnFunction): JSX.Element[] => {
        return field.columns.map((c) => {
          const registerColumn = (options?: RegisterOptions) => ({
            ...registerLine(options),
            value: c.label
          })

          return render({ ...c, registerColumn })
        })
      }

      return render({ ...l, renderColumns })
    })
  }

  return { ...field, renderGrid }
}
