import React from 'react'
import styled from 'styled-components'

import { GoogleFormProvider, useGoogleForm } from 'react-google-forms'

import CheckboxInput from './components/CheckboxInput'
import form from './scripts/form.json'
import RadioInput from './components/RadioInput'

const Form = styled.form`
  max-width: 600px;
  margin: 0 auto;
  padding: 50px 0;
`

const QuestionContainer = styled.div`
  margin-bottom: 20px;
`

const QuestionLabel = styled.h3`
  margin-bottom: 10px;
`

const Questions = () => {
  return (
    <div>
      {Object.keys(form.fields).map((id) => {
        const field = form.fields[id]

        let questionInput = null
        switch (field.type) {
          case 'CHECKBOX':
            questionInput = <CheckboxInput id={id} />
            break
          case 'RADIO':
            questionInput = <RadioInput id={id} />
            break
        }

        if (!questionInput) {
          return null
        }

        return (
          <QuestionContainer key={id}>
            <QuestionLabel>{field.label}</QuestionLabel>
            {questionInput}
          </QuestionContainer>
        )
      })}
    </div>
  )
}

const App = () => {
  const methods = useGoogleForm({ form })
  const onSubmit = (data) => console.log('>>> Here  are the data', data)

  console.log('>>> Here are the errors!!!', methods.formState.errors)

  return (
    <GoogleFormProvider {...methods}>
      <Form onSubmit={methods.handleSubmit(onSubmit)}>
        <Questions />
        <button type='submit'>Submeter</button>
      </Form>
    </GoogleFormProvider>
  )
}

export default App
