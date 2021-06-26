import React from 'react'
import { useCheckboxInput } from '../useGoogleForm'

export default ({ questionId }) => {
  const { options, register } = useCheckboxInput(questionId)
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {options.map(o => (
        <>
          <input type='checkbox' key={o.label} label={o.label} value={o.label} {...register()} />{o.label}
        </>
      ))}
    </div>
  )
}