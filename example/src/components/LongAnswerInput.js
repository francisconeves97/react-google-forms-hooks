import React from 'react'
import { useLongAnswerInput } from '../useGoogleForm'

export default ({ questionId }) => {
  const { label, register } = useLongAnswerInput(questionId)
  
  return (
    <div>
      {label}<textarea placeholder={label} {...register()} />
    </div>
  )
}