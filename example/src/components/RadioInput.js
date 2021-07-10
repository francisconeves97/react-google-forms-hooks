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
  const { options, customOption } = useRadioInput(id)

  return (
    <Container>
      {options.map((o) => (
        <CheckboxContainer key={o.id}>
          <input type='radio' id={o.id} {...o.registerOption()} />
          <label htmlFor={o.id}>{o.label}</label>
        </CheckboxContainer>
      ))}
      {customOption && (
        <CheckboxContainer>
          <input
            type='radio'
            id={customOption.id}
            {...customOption.registerOption()}
          />
          <label htmlFor={customOption.id}>Outra</label>
          <input
            type='text'
            placeholder='Resposta aqui'
            {...customOption.registerCustomInput()}
          />
        </CheckboxContainer>
      )}
    </Container>
  )
}
