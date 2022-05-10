import React from 'react'

import { useTimeInput } from 'react-google-forms-hooks'

export default function TimeInput({ id }) {
  const { register } = useTimeInput(id)

  return (
    <div>
      <input type='time' {...register()} />
    </div>
  )
}
