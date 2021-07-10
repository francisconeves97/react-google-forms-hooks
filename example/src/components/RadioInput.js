import React from 'react'
import styled from 'styled-components'

import { useRadioInput } from 'react-google-forms'

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const CheckboxContainer = styled.div`
  display: flex;

  & label {
    margin: 0 10px;
  }
`

export default function RadioInput({ id }) {
  const { options, register, hasCustom, registerCustom, registerCustomInput } =
    useRadioInput(id)

  return (
    <Container>
      {options.map((o) => (
        <CheckboxContainer key={o.label}>
          <input type='radio' value={o.label} {...register()} />
          <label htmlFor={id}>{o.label}</label>
        </CheckboxContainer>
      ))}
      {hasCustom && (
        <CheckboxContainer>
          <input type='radio' {...registerCustom()} />
          <label htmlFor={id}>Outra</label>
          <input
            type='text'
            placeholder='Resposta aqui'
            {...registerCustomInput()}
          />
        </CheckboxContainer>
      )}
    </Container>
  )
}
