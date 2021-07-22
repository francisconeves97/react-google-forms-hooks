import React from 'react'
import { RegisterOptions } from 'react-hook-form'
import { renderHook } from '@testing-library/react-hooks'
import { render, fireEvent, screen, act } from '@testing-library/react'

import { TextField } from '../../types'
import { useLongAnswerInput } from '../useLongAnswerInput'
import { MockGoogleFormComponent, mockGetField } from './helpers/utils'

describe('useLongAnswerInput', () => {
  const mockLongAnswerField: TextField = {
    id: 'long_answer',
    label: 'Long Answer Question',
    type: 'LONG_ANSWER',
    required: false
  }
  let output = {}
  const onSubmit = (data: object) => {
    output = data
  }

  const LongAnswerComponent = (props: { options?: RegisterOptions }) => {
    const { register, error } = useLongAnswerInput(mockLongAnswerField.id)
    return (
      <>
        <textarea {...register(props.options)} />
        {error && <span>Error {error.type}</span>}
      </>
    )
  }

  const renderComponent = (options?: RegisterOptions) =>
    render(
      <MockGoogleFormComponent onSubmit={onSubmit}>
        <LongAnswerComponent options={options}></LongAnswerComponent>
      </MockGoogleFormComponent>
    )

  const submitForm = async () => {
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'submit' }))
    })
  }

  const fillTextField = async (value: string) => {
    await act(async () => {
      fireEvent.change(screen.getByRole('textbox'), {
        target: { value: value }
      })
    })
  }

  beforeEach(() => {
    mockGetField.mockImplementation(() => mockLongAnswerField)
  })

  afterEach(() => {
    output = {}
  })

  it('returns the correspondent field information', () => {
    const { result } = renderHook(
      () => useLongAnswerInput(mockLongAnswerField.id),
      {
        wrapper: MockGoogleFormComponent
      }
    )

    expect(result.current).toMatchObject(mockLongAnswerField)
  })

  it('registers the field correctly', async () => {
    renderComponent()

    await fillTextField('xico')

    await submitForm()

    expect(output).toEqual({
      [mockLongAnswerField.id]: 'xico'
    })
  })

  describe('when the field is required', () => {
    const requiredMockField = {
      ...mockLongAnswerField,
      required: true
    }
    beforeEach(() => {
      mockGetField.mockClear()
      mockGetField.mockImplementation(() => requiredMockField)
    })

    it('gives an error when the field is not filled', async () => {
      renderComponent()

      await submitForm()

      expect(screen.getByText('Error required')).toBeVisible()
    })
  })

  describe('when other validations are passed to the register method', () => {
    it('gives a validation error when it does not comply the validation', async () => {
      renderComponent({ minLength: 3 })

      await fillTextField('xi')

      await submitForm()

      expect(screen.getByText('Error minLength')).toBeVisible()
    })
  })
})
