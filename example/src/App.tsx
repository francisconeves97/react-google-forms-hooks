import React from 'react'

import { useGoogleFormContext, GoogleFormProvider } from './useFormContext'
import { useGoogleForm } from './useGoogleForm'
import CheckboxInput from './components/CheckboxInput'

import form from './form.json'


const App = () => {
  const methods = useGoogleForm({ form })
  const onSubmit = (data: any) => console.log(data)

  return (
    <div>
      <GoogleFormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <CheckboxInput questionId="705101286" />
        <button type='submit'>Submeter</button>
        </form>
      </GoogleFormProvider>
    </div>
  )
}

export default App
