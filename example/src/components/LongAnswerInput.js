import React from 'react'

import { useLongAnswerInput } from 'react-google-forms'

export default function LongAnswerInput({ id }) {
  const { register } = useLongAnswerInput(id)

  return (
    <div>
      <textarea type='text' {...register()} />
    </div>
  )
}
