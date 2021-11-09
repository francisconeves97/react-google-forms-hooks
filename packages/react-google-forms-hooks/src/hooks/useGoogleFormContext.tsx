import * as React from 'react'
import { UseGoogleFormReturn } from '../types'

const GoogleFormContext = React.createContext<UseGoogleFormReturn | null>(null)
export const useGoogleFormContext = () => React.useContext(GoogleFormContext)

export const GoogleFormProvider = ({
  children,
  ...other
}: {
  children: React.ReactNode
}) => {
  return (
    <GoogleFormContext.Provider value={other as UseGoogleFormReturn}>
      {children}
    </GoogleFormContext.Provider>
  )
}
