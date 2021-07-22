import React from 'react'

import { GoogleFormProvider } from '../../useGoogleFormContext'

export const getContextWrapper = (props = {}) =>
  function ContextWrapper({ children }: { children?: React.ReactNode }) {
    // @ts-ignore
    return <GoogleFormProvider {...props}>{children}</GoogleFormProvider>
  }
