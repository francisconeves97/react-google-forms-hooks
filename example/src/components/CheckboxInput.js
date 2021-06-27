import React from 'react'
import { useCheckboxInput } from '../useGoogleForm'

export default ({ questionId }) => {
  const { options, register, hasCustom, registerCustom, registerCustomInput } = useCheckboxInput(questionId)
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {options.map(o => (
        <React.Fragment key={o.label}>
          <input type='checkbox' value={o.label} {...register()} />{o.label}
        </React.Fragment>
      ))}
      {hasCustom && (
        <div>
          <input type='checkbox' {...registerCustom()} />Outra
          <input type='text' placeholder='Resposta aqui' {...registerCustomInput()} />
        </div>
      )}
    </div>
  )
}