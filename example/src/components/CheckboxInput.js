import React from 'react'
import styled from 'styled-components'

import { useCheckboxInput } from 'react-google-forms'

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

export default function CheckboxInput({ id }) {
  const { options, register, hasCustom, registerCustom, registerCustomInput } =
    useCheckboxInput(id)

  return (
    <Container>
      {options.map((o) => (
        <CheckboxContainer key={o.label}>
          <input type='checkbox' value={o.label} {...register()} />
          <label htmlFor={id}>{o.label}</label>
        </CheckboxContainer>
      ))}
      {hasCustom && (
        <CheckboxContainer>
          <input type='checkbox' {...registerCustom()} />
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
