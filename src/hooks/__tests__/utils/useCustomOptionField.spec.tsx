import React from 'react'
import { RegisterOptions } from 'react-hook-form'
import { renderHook } from '@testing-library/react-hooks'
import { render, fireEvent, screen, act } from '@testing-library/react'

import { CustomOptionField } from '../../../types'
import useCustomOptionField from '../../utils/useCustomOptionField'
import {
  MockGoogleFormComponent,
  mockGetField,
  submitForm
} from '../helpers/utils'

jest.mock('slugify', () => {
  return (s: string) => s
})

describe('useCustomOptionField', () => {
  const mockCustomOptionField: CustomOptionField = {
    id: 'custom_option_answer',
    label: 'Radio Answer Queston',
    type: 'RADIO',
    required: false,
    options: [
      {
        label: 'Option 1'
      },
      {
        label: 'Option 2'
      },
      {
        label: 'Option 3'
      },
      {
        label: 'Option 4'
      }
    ]
  }
  const options = mockCustomOptionField.options
  const firstLabel = options[0].label
  const lastLabel = options[options.length - 1].label
  let output = {}
  const onSubmit = (data: object) => {
    output = data
  }

  const CustomOptionInputComponent = ({
    options: registerOptions,
    customInputOptions,
    type = 'radio'
  }: {
    options?: RegisterOptions
    customInputOptions?: RegisterOptions
    type?: 'radio' | 'checkbox'
  }) => {
    const { customOption, options, error } = useCustomOptionField(
      mockCustomOptionField.id,
      type.toUpperCase() as 'RADIO' | 'CHECKBOX'
    )
    return (
      <>
        {options.map((o) => (
          <React.Fragment key={o.id}>
            <input
              type={type}
              id={o.id}
              {...o.registerOption(registerOptions)}
            />
            <label htmlFor={o.id}>{o.label}</label>
          </React.Fragment>
        ))}
        {customOption && (
          <>
            <input
              type={type}
              id={customOption.id}
              {...customOption.registerOption(registerOptions)}
            />
            <label htmlFor={customOption.id}>Custom option</label>
            <input
              type='text'
              placeholder='Resposta aqui'
              {...customOption.registerCustomInput(customInputOptions)}
            />
            {customOption.error && (
              <span>Custom option error {customOption.error.type}</span>
            )}
          </>
        )}
        {error && <span>Error {error.type}</span>}
      </>
    )
  }

  const renderComponent = ({
    options,
    customInputOptions,
    type = 'radio'
  }: {
    options?: RegisterOptions
    customInputOptions?: RegisterOptions
    type?: 'radio' | 'checkbox'
  } = {}) =>
    render(
      <MockGoogleFormComponent onSubmit={onSubmit}>
        <CustomOptionInputComponent
          options={options}
          type={type}
          customInputOptions={customInputOptions}
        ></CustomOptionInputComponent>
      </MockGoogleFormComponent>
    )

  const clickOption = async (label: string) => {
    await act(async () => {
      fireEvent.click(screen.getByLabelText(label))
    })
  }

  beforeEach(() => {
    mockGetField.mockImplementation(() => mockCustomOptionField)
  })

  afterEach(() => {
    output = {}
  })

  it('returns the correspondent field information', () => {
    const { result } = renderHook(
      () =>
        useCustomOptionField(
          mockCustomOptionField.id,
          mockCustomOptionField.type
        ),
      {
        wrapper: MockGoogleFormComponent
      }
    )

    expect(result.current).toMatchObject(mockCustomOptionField)
  })

  it('builds the options ids correctly', () => {
    const { result } = renderHook(
      () =>
        useCustomOptionField(
          mockCustomOptionField.id,
          mockCustomOptionField.type
        ),
      {
        wrapper: MockGoogleFormComponent
      }
    )

    result.current.options.forEach((o) =>
      expect(o.id).toBe(`${result.current.id}-${o.label}`)
    )
  })

  it('registers the field correctly', async () => {
    renderComponent()

    await clickOption(firstLabel)

    await submitForm()

    expect(output).toEqual({
      [mockCustomOptionField.id]: firstLabel
    })
  })

  describe('when the field type is RADIO', () => {
    it('changes between options correctly', async () => {
      renderComponent()
      await clickOption(firstLabel)
      await submitForm()

      expect(output).toEqual({
        [mockCustomOptionField.id]: firstLabel
      })

      await clickOption(lastLabel)
      await submitForm()

      expect(output).toEqual({
        [mockCustomOptionField.id]: lastLabel
      })
    })
  })

  describe('when the field type is CHECKBOX', () => {
    const mockCheckboxField: CustomOptionField = {
      ...mockCustomOptionField,
      label: 'Checkbox Answer Queston',
      type: 'CHECKBOX'
    }

    beforeEach(() => {
      mockGetField.mockClear()
      mockGetField.mockImplementation(() => mockCheckboxField)
    })

    it('selects the options correctly', async () => {
      renderComponent({ type: 'checkbox' })
      await clickOption(firstLabel)
      await submitForm()

      expect(output).toEqual({
        [mockCustomOptionField.id]: [firstLabel]
      })

      await clickOption(lastLabel)
      await submitForm()

      expect(output).toEqual({
        [mockCustomOptionField.id]: [firstLabel, lastLabel]
      })

      await clickOption(lastLabel)
      await submitForm()

      expect(output).toEqual({
        [mockCustomOptionField.id]: [firstLabel]
      })
    })
  })

  describe('when the field is required', () => {
    const requiredMockField = {
      ...mockCustomOptionField,
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
      renderComponent({ options: { validate: (value) => value === lastLabel } })

      await clickOption(lastLabel)

      await submitForm()

      expect(output).toEqual({
        [mockCustomOptionField.id]: lastLabel
      })
    })

    it('gives a validation error when it does not comply with the validation', async () => {
      renderComponent({ options: { validate: (value) => value === lastLabel } })

      await clickOption(firstLabel)

      await submitForm()

      expect(screen.getByText('Error validate')).toBeVisible()
    })
  })
})
