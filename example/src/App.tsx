import React from 'react'

import { GoogleFormProvider } from './useFormContext'
import { useGoogleForm } from './useGoogleForm'
import CheckboxInput from './components/CheckboxInput'
import RadioInput from './components/RadioInput'
import ShortAnswerInput from './components/ShortAnswerInput'

import form from './form.json'


const App = () => {
  const methods = useGoogleForm({ form })
  const onSubmit = (data: any) => console.log('>>> Here  are the data', data)

  console.log('>>> Here are the errors!!!', methods.formState.errors)

  return (
    <div>
      <GoogleFormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <CheckboxInput questionId="705101286" />
        <RadioInput questionId="1387297716" />
        <ShortAnswerInput questionId="461850935" />
        <button type='submit'>Submeter</button>
        </form>
      </GoogleFormProvider>
    </div>
  )
}

export default App
