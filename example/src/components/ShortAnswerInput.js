import React from 'react'
import { useShortAnswerInput } from '../useGoogleForm'

export default ({ questionId }) => {
  const { label, register } = useShortAnswerInput(questionId)
  
  return (
    <div>
      {label}<input type='text' placeholder={label} {...register()} />
    </div>
  )
}