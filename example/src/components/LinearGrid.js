import React from 'react'
import styled from 'styled-components'

import { useLinearInput } from 'react-google-forms-hooks'

const Container = styled.div`
  display: flex;
  align-items: center;

  & * {
    margin: 0 10px;
  }
  margin-bottom 10px;
`

const ErrorLabel = styled.span`
  color: red;
`

export default function LinearGrid({ id }) {
  const { options, legend, error } = useLinearInput(id)

  return (
    <>
      <Container>
        <div>{legend.labelFirst}</div>
        {options.map((o) => {
          return <input key={o.id} type='radio' {...o.registerOption()} />
        })}
        <div>{legend.labelLast}</div>
      </Container>
      <ErrorLabel>{error && 'This field is required'}</ErrorLabel>
    </>
  )
}
