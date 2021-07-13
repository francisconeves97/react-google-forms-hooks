import React from 'react'
import { renderHook } from '@testing-library/react-hooks'
import { render, fireEvent, screen, act } from '@testing-library/react'

import { GoogleForm, TextField } from '../../types'
import { useGoogleForm } from '../useGoogleForm'
import { useShortAnswerInput } from '../useShortAnswerInput'
import { getContextWrapper } from './utils'

describe('useShortAnswerInput', () => {
  const mockShortAnswerField: TextField = {
    id: 'short_answer',
    label: 'Short Answer Question',
    type: 'SHORT_ANSWER',
    required: false
  }
  const mockGoogleForm = {} as GoogleForm
  const mockGetField = jest.fn(() => mockShortAnswerField)
  let output: {} = {}
  const Component = ({ children }: { children?: React.ReactNode }) => {
    const methods = useGoogleForm({ form: mockGoogleForm })
    const GoogleFormContext = getContextWrapper({
      ...methods,
      getField: mockGetField
    })
    return (
      <GoogleFormContext>
        <form
          onSubmit={methods.handleSubmit((data) => {
            output = data
          })}
        >
          {children}
          <button type='submit'>submit</button>
        </form>
      </GoogleFormContext>
    )
  }

  const ShortAnswerComponent = () => {
    const { register } = useShortAnswerInput(mockShortAnswerField.id)

    return <input type='text' {...register({})} />
  }

  it('returns the correspondent field information', () => {
    const { result } = renderHook(
      () => useShortAnswerInput(mockShortAnswerField.id),
      {
        wrapper: Component
      }
    )

    expect(result.current).toMatchObject(mockShortAnswerField)
  })

  it('registers the field correctly', async () => {
    render(
      <Component>
        <ShortAnswerComponent></ShortAnswerComponent>
      </Component>
    )

    await act(async () => {
      fireEvent.change(screen.getByRole('textbox'), {
        target: { value: 'xico' }
      })
    })

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'submit' }))
    })

    expect(output).toEqual({
      [mockShortAnswerField.id]: 'xico'
    })
  })
})
