import React from 'react'
import { RegisterOptions } from 'react-hook-form'
import { renderHook } from '@testing-library/react-hooks'
import { render, fireEvent, screen, act } from '@testing-library/react'

import { useDropdownInput } from '../useDropdownInput'
import { DropdownField } from '../../types'
import {
  MockGoogleFormComponent,
  mockGetField,
  submitForm
} from './helpers/utils'

describe('useDropdownInput', () => {
  const mockDropdownField: DropdownField = {
    id: 'dropdown_field',
    label: 'Dropdown Field Question',
    type: 'DROPDOWN',
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
    ]
  }
  const options = mockDropdownField.options
  const firstOption = options[0].label
  const lastOption = options[options.length - 1].label
  let output = {}
  const onSubmit = (data: object) => {
    output = data
  }

  const DropdownComponent = (props: { options?: RegisterOptions }) => {
    const { register, options, error } = useDropdownInput(mockDropdownField.id)

    return (
      <>
        <select {...register(props.options)} data-testid='select'>
          <option value=''>Select option</option>
          {options.map((o) => {
            return (
              <option key={o.label} value={o.label}>
                {o.label}
              </option>
            )
          })}
        </select>
        {error && <span>Error {error.type}</span>}
      </>
    )
  }

  const renderComponent = (options?: RegisterOptions) =>
    render(
      <MockGoogleFormComponent onSubmit={onSubmit}>
        <DropdownComponent options={options}></DropdownComponent>
      </MockGoogleFormComponent>
    )

  const clickOption = async (label: string) => {
    await act(async () => {
      fireEvent.change(screen.getByTestId('select'), {
        target: { value: label }
      })
    })
  }

  beforeEach(() => {
    mockGetField.mockImplementation(() => mockDropdownField)
  })

  afterEach(() => {
    output = {}
  })

  it('returns the correspondent field information', () => {
    const { result } = renderHook(
      () => useDropdownInput(mockDropdownField.id),
      {
        wrapper: MockGoogleFormComponent
      }
    )

    expect(result.current).toMatchObject(mockDropdownField)
  })

  it('builds the options ids correctly', () => {
    const { result } = renderHook(
      () => useDropdownInput(mockDropdownField.id),
      {
        wrapper: MockGoogleFormComponent
      }
    )

    result.current.options.forEach((o) =>
      expect(o.id).toBe(`${result.current.id}-${o.label}`)
    )
  })

  it('registers the options correctly', async () => {
    renderComponent()

    await clickOption(firstOption)

    await submitForm()

    expect(output).toEqual({
      [mockDropdownField.id]: firstOption
    })
  })

  it('changes between options correctly', async () => {
    renderComponent()
    await clickOption(firstOption)
    await submitForm()

    expect(output).toEqual({
      [mockDropdownField.id]: firstOption
    })

    await clickOption(lastOption)
    await submitForm()

    expect(output).toEqual({
      [mockDropdownField.id]: lastOption
    })
  })

  describe('when the field is required', () => {
    const requiredMockField = {
      ...mockDropdownField,
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
      renderComponent({ validate: (value) => value === lastOption })

      await clickOption(lastOption)

      await submitForm()

      expect(output).toEqual({
        [mockDropdownField.id]: lastOption
      })
    })

    it('gives a validation error when it does not comply with the validation', async () => {
      renderComponent({ validate: (value) => value === lastOption })

      await clickOption(firstOption)

      await submitForm()

      expect(screen.getByText('Error validate')).toBeVisible()
    })
  })
})
