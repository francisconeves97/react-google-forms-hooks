import React from 'react'
import { RegisterOptions } from 'react-hook-form'
import { renderHook } from '@testing-library/react-hooks'
import { render, fireEvent, screen, act } from '@testing-library/react'

import { useLinearInput } from '../useLinearInput'
import { LinearField } from '../../types'
import {
  MockGoogleFormComponent,
  mockGetField,
  submitForm
} from './helpers/utils'

jest.mock('slugify', () => {
  return (s: string) => s
})

describe('useLinearInput', () => {
  const mockLinearField: LinearField = {
    id: 'linear_field',
    label: 'Linear Field Question',
    type: 'LINEAR',
    required: false,
    options: [
      {
        label: '1'
      },
      {
        label: '2'
      },
      {
        label: '3'
      },
      {
        label: '4'
      }
    ],
    legend: {
      labelFirst: 'Left',
      labelLast: 'Right'
    }
  }
  const options = mockLinearField.options
  const firstLabel = options[0].label
  const lastLabel = options[options.length - 1].label
  let output = {}
  const onSubmit = (data: object) => {
    output = data
  }

  const LinearInputComponent = (props: { options?: RegisterOptions }) => {
    const { options, error } = useLinearInput(mockLinearField.id)

    return (
      <>
        {options.map((o) => (
          <React.Fragment key={o.id}>
            <input
              type='radio'
              id={o.id}
              {...o.registerOption(props.options)}
            />
            <label htmlFor={o.id}>{o.label}</label>
          </React.Fragment>
        ))}
        {error && <span>Error {error.type}</span>}
      </>
    )
  }

  const renderComponent = (options?: RegisterOptions) =>
    render(
      <MockGoogleFormComponent onSubmit={onSubmit}>
        <LinearInputComponent options={options}></LinearInputComponent>
      </MockGoogleFormComponent>
    )

  const clickOption = async (label: string) => {
    await act(async () => {
      fireEvent.click(screen.getByLabelText(label))
    })
  }

  beforeEach(() => {
    mockGetField.mockImplementation(() => mockLinearField)
  })

  afterEach(() => {
    output = {}
  })

  it('returns the correspondent field information', () => {
    const { result } = renderHook(() => useLinearInput(mockLinearField.id), {
      wrapper: MockGoogleFormComponent
    })

    expect(result.current).toMatchObject(mockLinearField)
  })

  it('builds the options ids correctly', () => {
    const { result } = renderHook(() => useLinearInput(mockLinearField.id), {
      wrapper: MockGoogleFormComponent
    })

    result.current.options.forEach((o) =>
      expect(o.id).toBe(`${result.current.id}-${o.label}`)
    )
  })

  it('registers the options correctly', async () => {
    const firstLabel = mockLinearField.options[0].label

    renderComponent()

    await clickOption(firstLabel)

    await submitForm()

    expect(output).toEqual({
      [mockLinearField.id]: firstLabel
    })
  })

  it('changes between options correctly', async () => {
    renderComponent()
    await clickOption(firstLabel)
    await submitForm()

    expect(output).toEqual({
      [mockLinearField.id]: firstLabel
    })

    await clickOption(lastLabel)
    await submitForm()

    expect(output).toEqual({
      [mockLinearField.id]: lastLabel
    })
  })

  describe('when the field is required', () => {
    const requiredMockField = {
      ...mockLinearField,
      required: true
    }

    beforeEach(() => {
      mockGetField.mockClear()
      mockGetField.mockImplementation(() => requiredMockField)
    })

    it('gives an error when no option is selected', async () => {
      renderComponent()

      await submitForm()

      expect(screen.getByText('Error required')).toBeVisible()
    })
  })

  describe('when other validations are passed to the register method', () => {
    it('submits the form successfully when it does comply with the validation', async () => {
      renderComponent({ validate: (value) => value === lastLabel })

      await clickOption(lastLabel)

      await submitForm()

      expect(output).toEqual({
        [mockLinearField.id]: lastLabel
      })
    })

    it('gives a validation error when it does not comply with the validation', async () => {
      renderComponent({ validate: (value) => value === lastLabel })

      await clickOption(firstLabel)

      await submitForm()

      expect(screen.getByText('Error validate')).toBeVisible()
    })
  })
})
