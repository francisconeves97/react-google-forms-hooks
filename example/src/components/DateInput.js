import React from 'react'

import { useDateInput } from 'react-google-forms-hooks'

const Label = ({ children }) => (
  <span style={{ marginRight: '1rem' }}>{children}</span>
)

const FieldContainer = ({ children }) => (
  <div style={{ margin: '0.25rem' }}>{children}</div>
)

export default function LongAnswerInput({ id }) {
  const {
    registerDay,
    registerMonth,
    registerYear,
    registerHour,
    registerMinute,
    error
  } = useDateInput(id)

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <FieldContainer>
        <Label>Day</Label>
        <input type='text' {...registerDay()} />
      </FieldContainer>
      <FieldContainer>
        <Label>Month</Label>
        <input type='text' {...registerMonth()} />
      </FieldContainer>
      {registerYear && (
        <FieldContainer>
          <Label>Year</Label>
          <input type='text' {...registerYear()} />
        </FieldContainer>
      )}
      {registerHour && (
        <FieldContainer>
          <Label>Hour</Label>
          <input type='text' {...registerHour()} />
        </FieldContainer>
      )}
      {registerMinute && (
        <FieldContainer>
          <Label>Minute</Label>
          <input type='text' {...registerMinute()} />
        </FieldContainer>
      )}
      {error?.type === 'validate' && (
        <span style={{ color: 'red' }}>Date is invalid</span>
      )}
    </div>
  )
}
