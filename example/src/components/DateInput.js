import React from 'react'

import { useDateInput } from 'react-google-forms-hooks'

export default function DateInput({ id }) {
  const { register } = useDateInput(id)

  return (
    <div>
      <input type='date' {...register()} />
    </div>
  )
}
