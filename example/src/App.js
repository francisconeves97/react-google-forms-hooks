import React from 'react'

import { GoogleFormProvider, useGoogleForm, useRadioInput } from 'react-google-forms'

import form from './scripts/form.json'

const CheckboxInput = () => {
  const { options, register, hasCustom, registerCustom, registerCustomInput } = useRadioInput('1387297716')
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {options.map(o => (
        <React.Fragment key={o.label}>
          <input type='radio' value={o.label} {...register()} />{o.label}
        </React.Fragment>
      ))}
      {hasCustom && (
        <div>
          <input type='radio' {...registerCustom()} />Outra
          <input type='text' placeholder='Resposta aqui' {...registerCustomInput()} />
        </div>
      )}
    </div>
  )
}

const Form = ({ form }) => {

  return <div><CheckboxInput id='' /></div>
}


const App = () => {
  const methods = useGoogleForm({ form })
  return <GoogleFormProvider {...methods}><div><Form form={form} /></div></GoogleFormProvider>
}

export default App
