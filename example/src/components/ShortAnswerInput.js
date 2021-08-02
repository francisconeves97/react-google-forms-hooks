import React from 'react'

import { useShortAnswerInput } from 'react-google-forms-hooks'

export default function ShortAnswerInput({ id }) {
  const { register } = useShortAnswerInput(id)

  return (
    <div>
      <input type='text' {...register()} />
    </div>
  )
}
