import React from 'react'
import styled from 'styled-components'

import { useCheckboxInput } from 'react-google-forms-hooks'

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
  const { options, customOption } = useCheckboxInput(id)

  return (
    <Container>
      {options.map((o) => (
        <CheckboxContainer key={o.id}>
          <input type='checkbox' id={o.id} {...o.registerOption()} />
          <label htmlFor={o.id}>{o.label}</label>
        </CheckboxContainer>
      ))}
      {customOption && (
        <CheckboxContainer>
          <input
            type='checkbox'
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
