import React from 'react'

import { useGoogleFormContext, GoogleFormProvider } from './useFormContext'
import { useGoogleForm } from './useGoogleForm'
import CheckboxInput from './components/CheckboxInput'

import form from './form.json'


const App = () => {
  const methods = useGoogleForm({ form })

  return (
    <div>
      <GoogleFormProvider {...methods}>
        <CheckboxInput questionId="705101286" />
      </GoogleFormProvider>
    </div>
  )
}

export default App
