import React from 'react'

import { useDropdownInput } from 'react-google-forms-hooks'

export default function DropdownInput({ id }) {
  const { register, options } = useDropdownInput(id)

  return (
    <div>
      <select {...register()}>
        <option value=''>Select option</option>
        {options.map((o) => {
          return (
            <option key={o.label} value={o.label}>
              {o.label}
            </option>
          )
        })}
      </select>
    </div>
  )
}
