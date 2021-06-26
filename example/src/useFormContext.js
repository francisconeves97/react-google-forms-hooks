import React from 'react'

const GoogleFormContext = React.createContext()

export const useGoogleFormContext = () => React.useContext(GoogleFormContext)

export const GoogleFormProvider = ({ children, ...other }) => {
  return (
    <GoogleFormContext.Provider value={other}>
      {children}
    </GoogleFormContext.Provider>
  )
}