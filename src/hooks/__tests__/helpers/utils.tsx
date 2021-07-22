import React from 'react'

import { GoogleFormProvider } from '../../useGoogleFormContext'
import { useGoogleForm } from '../../useGoogleForm'
import { GoogleForm } from '../../../types'

export const getContextWrapper = (props = {}) =>
  function ContextWrapper({ children }: { children?: React.ReactNode }) {
    // @ts-ignore
    return <GoogleFormProvider {...props}>{children}</GoogleFormProvider>
  }

export const mockGetField = jest.fn()
export const MockGoogleFormComponent = ({
  children,
  onSubmit
}: {
  children?: React.ReactNode
  onSubmit: (data: object) => void
}) => {
  const methods = useGoogleForm({ form: {} as GoogleForm })
  const GoogleFormContext = getContextWrapper({
    ...methods,
    getField: mockGetField
  })
  return (
    <GoogleFormContext>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {children}
        <button type='submit'>submit</button>
      </form>
    </GoogleFormContext>
  )
}
