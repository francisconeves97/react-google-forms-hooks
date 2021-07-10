import React from 'react'
import styled from 'styled-components'

import { GoogleFormProvider, useGoogleForm } from 'react-google-forms'

import CheckboxInput from './components/CheckboxInput'
import form from './scripts/form.json'

const Form = styled.form`
  max-width: 600px;
  margin: 0 auto;
`

const App = () => {
  const methods = useGoogleForm({ form })
  const onSubmit = (data) => console.log('>>> Here  are the data', data)

  console.log('>>> Here are the errors!!!', methods.formState.errors)

  return (
    <GoogleFormProvider {...methods}>
      <Form onSubmit={methods.handleSubmit(onSubmit)}>
        <CheckboxInput id='705101286' />
        <button type='submit'>Submeter</button>
      </Form>
    </GoogleFormProvider>
  )
}

export default App
