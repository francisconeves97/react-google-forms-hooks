import React from 'react'
import styled from 'styled-components'

import { useLinearInput } from 'react-google-forms'

const Container = styled.div`
  display: flex;
  align-items: center;

  & * {
    margin: 0 10px;
  }
`

export default function ShortAnswerInput({ id }) {
  const { options, legend } = useLinearInput(id)

  return (
    <Container>
      <div>{legend.labelFirst}</div>
      {options.map((o) => {
        return <input key={o.id} type='radio' {...o.registerOption()} />
      })}
      <div>{legend.labelLast}</div>
    </Container>
  )
}
