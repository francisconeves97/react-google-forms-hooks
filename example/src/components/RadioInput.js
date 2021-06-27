import React from 'react'
import { useRadioInput } from '../useGoogleForm'

export default ({ questionId }) => {
  const { options, register, hasCustom, registerCustom, registerCustomInput } = useRadioInput(questionId)
  
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