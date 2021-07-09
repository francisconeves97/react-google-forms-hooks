import React, { useEffect, useState } from 'react'

import { googleFormsToJson, GoogleFormProvider, useGoogleForm, useRadioInput } from 'react-google-forms'

import form from './scripts/form.json'

const CheckboxInput = () => {
  const methods = useRadioInput('1387297716')

  return <div>
    ola
  </div>
}

const Form = ({ form }) => {

  return <div><CheckboxInput id='' /></div>
}


const App = () => {
  const methods = useGoogleForm({ form })
  return <GoogleFormProvider {...methods}><div><Form form={form} /></div></GoogleFormProvider>
}

export default App
