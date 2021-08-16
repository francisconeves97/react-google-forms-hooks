import React from 'react'
import { RegisterOptions } from 'react-hook-form'
import { renderHook } from '@testing-library/react-hooks'
import { render, fireEvent, screen, act } from '@testing-library/react'

import { CustomOptionField } from '../../../types'
import useCustomOptionField, {
  OTHER_OPTION,
  buildCustomFieldId
} from '../../utils/useCustomOptionField'
import {
  MockGoogleFormComponent,
  mockGetField,
  submitForm
} from '../helpers/utils'

jest.mock('slugify', () => {
  return (s: string) => s
})

describe('useCustomOptionField', () => {
  const mockOptionField: CustomOptionField = {
    id: 'id',
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
  const options = mockOptionField.options
  const firstLabel = options[0].label
  const lastLabel = options[options.length - 1].label
  const customOptionLabel = 'Custom option'
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
    const { customOption, options, error, isCustomOptionSelected } =
      useCustomOptionField(
        mockOptionField.id,
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
            <label htmlFor={customOption.id}>{customOptionLabel}</label>
            <input
              type='text'
              {...customOption.registerCustomInput(customInputOptions)}
            />
            {customOption.error && (
              <span>
                {customOptionLabel} error {customOption.error.type}
              </span>
            )}
            {isCustomOptionSelected && <span>Custom option selected</span>}
          </>
        )}
        {error && <span>Error {error.type}</span>}
      </>
    )
  }

  const renderComponent = ({
    options,
    customInputOptions,
    type
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

  const fillCustomOption = async (value: string) => {
    await act(async () => {
      fireEvent.change(screen.getByRole('textbox'), {
        target: { value: value }
      })
    })
  }

  beforeEach(() => {
    mockGetField.mockImplementation(() => mockOptionField)
  })

  afterEach(() => {
    output = {}
  })

  it('returns the correspondent field information', () => {
    const { result } = renderHook(
      () => useCustomOptionField(mockOptionField.id, mockOptionField.type),
      {
        wrapper: MockGoogleFormComponent
      }
    )

    expect(result.current).toMatchObject(mockOptionField)
  })

  it('builds the options ids correctly', () => {
    const { result } = renderHook(
      () => useCustomOptionField(mockOptionField.id, mockOptionField.type),
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
      [mockOptionField.id]: firstLabel
    })
  })

  describe('when the field type is RADIO', () => {
    it('changes between options correctly', async () => {
      renderComponent()
      await clickOption(firstLabel)
      await submitForm()

      expect(output).toEqual({
        [mockOptionField.id]: firstLabel
      })

      await clickOption(lastLabel)
      await submitForm()

      expect(output).toEqual({
        [mockOptionField.id]: lastLabel
      })
    })
  })

  describe('when the field type is CHECKBOX', () => {
    const mockCheckboxField: CustomOptionField = {
      ...mockOptionField,
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
        [mockOptionField.id]: [firstLabel]
      })

      await clickOption(lastLabel)
      await submitForm()

      expect(output).toEqual({
        [mockOptionField.id]: [firstLabel, lastLabel]
      })

      await clickOption(lastLabel)
      await submitForm()

      expect(output).toEqual({
        [mockOptionField.id]: [firstLabel]
      })
    })
  })

  describe('when the field is required', () => {
    const requiredMockField = {
      ...mockOptionField,
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
        [mockOptionField.id]: lastLabel
      })
    })

    it('gives a validation error when it does not comply with the validation', async () => {
      renderComponent({ options: { validate: (value) => value === lastLabel } })

      await clickOption(firstLabel)

      await submitForm()

      expect(screen.getByText('Error validate')).toBeVisible()
    })
  })

  describe('when the field has a custom option', () => {
    const mockCustomOptionField: CustomOptionField = {
      ...mockOptionField,
      options: [
        ...mockOptionField.options,
        {
          label: '',
          custom: true
        }
      ]
    }

    describe('when the field type is RADIO', () => {
      beforeEach(() => {
        mockGetField.mockClear()
        mockGetField.mockImplementation(() => mockCustomOptionField)
      })

      it('registers the custom option correctly', async () => {
        renderComponent()

        await clickOption(customOptionLabel)

        await submitForm()

        expect(output).toEqual({
          [mockOptionField.id]: OTHER_OPTION,
          [buildCustomFieldId(`${mockOptionField.id}-${OTHER_OPTION}`)]: ''
        })
      })

      it('computes isCustomOptionSelected correctly', async () => {
        renderComponent()

        expect(
          screen.queryByText('Custom option selected')
        ).not.toBeInTheDocument()

        await clickOption(customOptionLabel)

        expect(screen.getByText('Custom option selected')).toBeVisible()
      })

      it('changes between options correctly', async () => {
        renderComponent()

        await clickOption(customOptionLabel)
        await submitForm()

        expect(output).toEqual({
          [mockOptionField.id]: OTHER_OPTION,
          [buildCustomFieldId(`${mockOptionField.id}-${OTHER_OPTION}`)]: ''
        })

        await clickOption(firstLabel)
        await submitForm()

        expect(output).toEqual({
          [mockOptionField.id]: firstLabel,
          [buildCustomFieldId(`${mockOptionField.id}-${OTHER_OPTION}`)]: ''
        })
      })

      describe('when the field is required', () => {
        const mockCustomOptionRequiredField: CustomOptionField = {
          ...mockCustomOptionField,
          required: true
        }

        beforeEach(() => {
          mockGetField.mockClear()
          mockGetField.mockImplementation(() => mockCustomOptionRequiredField)
        })

        describe('when no option is selected', () => {
          it('gives an error on the field', async () => {
            renderComponent()

            await submitForm()

            expect(screen.getByText('Error required')).toBeVisible()
          })

          it('gives no error on the option field', async () => {
            renderComponent()

            await submitForm()

            expect(
              screen.queryByText(`${customOptionLabel} error required`)
            ).not.toBeInTheDocument()
          })
        })

        describe('when the custom option is selected and not filled', () => {
          it('gives no error on the field', async () => {
            renderComponent()

            await clickOption(customOptionLabel)

            await submitForm()

            expect(screen.queryByText('Error required')).not.toBeInTheDocument()
          })

          it('gives no error on the option field', async () => {
            renderComponent()

            await clickOption(customOptionLabel)

            await submitForm()

            expect(
              screen.getByText(`${customOptionLabel} error required`)
            ).toBeVisible()
          })
        })

        describe('when the custom option is selected and filled', () => {
          it('gives no error on the option field', async () => {
            renderComponent()

            await clickOption(customOptionLabel)
            await fillCustomOption('xico')

            await submitForm()

            expect(output).toEqual({
              [mockOptionField.id]: OTHER_OPTION,
              [buildCustomFieldId(`${mockOptionField.id}-${OTHER_OPTION}`)]:
                'xico'
            })
          })
        })
      })
    })

    describe('when the field type is CHECKBOX', () => {
      const mockCheckboxCustomOptionField: CustomOptionField = {
        ...mockCustomOptionField,
        type: 'CHECKBOX'
      }

      beforeEach(() => {
        mockGetField.mockClear()
        mockGetField.mockImplementation(() => mockCheckboxCustomOptionField)
      })

      it('registers the custom option correctly', async () => {
        renderComponent({ type: 'checkbox' })

        await clickOption(customOptionLabel)

        await submitForm()

        expect(output).toEqual({
          [mockOptionField.id]: [OTHER_OPTION],
          [buildCustomFieldId(`${mockOptionField.id}-${OTHER_OPTION}`)]: ''
        })
      })

      it('computes isCustomOptionSelected correctly', async () => {
        renderComponent({ type: 'checkbox' })

        expect(
          screen.queryByText('Custom option selected')
        ).not.toBeInTheDocument()

        await clickOption(customOptionLabel)

        expect(screen.getByText('Custom option selected')).toBeVisible()
      })

      it('selects the options correctly', async () => {
        renderComponent({ type: 'checkbox' })

        await clickOption(customOptionLabel)
        await submitForm()

        expect(output).toEqual({
          [mockOptionField.id]: [OTHER_OPTION],
          [buildCustomFieldId(`${mockOptionField.id}-${OTHER_OPTION}`)]: ''
        })

        await clickOption(firstLabel)
        await submitForm()

        expect(output).toEqual({
          [mockOptionField.id]: [firstLabel, OTHER_OPTION],
          [buildCustomFieldId(`${mockOptionField.id}-${OTHER_OPTION}`)]: ''
        })
      })

      describe('when the field is required', () => {
        const mockCheckboxCustomRequiredField: CustomOptionField = {
          ...mockCheckboxCustomOptionField,
          required: true
        }

        beforeEach(() => {
          mockGetField.mockClear()
          mockGetField.mockImplementation(() => mockCheckboxCustomRequiredField)
        })

        describe('when no option is selected', () => {
          it('gives an error on the field', async () => {
            renderComponent({ type: 'checkbox' })

            await submitForm()

            expect(screen.getByText('Error required')).toBeVisible()
          })

          it('gives no error on the option field', async () => {
            renderComponent({ type: 'checkbox' })

            await submitForm()

            expect(
              screen.queryByText(`${customOptionLabel} error required`)
            ).not.toBeInTheDocument()
          })
        })

        describe('when the custom option is selected and not filled', () => {
          it('gives no error on the field', async () => {
            renderComponent({ type: 'checkbox' })

            await clickOption(customOptionLabel)

            await submitForm()

            expect(screen.queryByText('Error required')).not.toBeInTheDocument()
          })

          it('gives no error on the option field', async () => {
            renderComponent({ type: 'checkbox' })

            await clickOption(customOptionLabel)

            await submitForm()

            expect(
              screen.getByText(`${customOptionLabel} error required`)
            ).toBeVisible()
          })
        })

        describe('when the custom option is selected and filled', () => {
          it('gives no error on the option field', async () => {
            renderComponent({ type: 'checkbox' })

            await clickOption(customOptionLabel)
            await fillCustomOption('xico')

            await submitForm()

            expect(output).toEqual({
              [mockOptionField.id]: [OTHER_OPTION],
              [buildCustomFieldId(`${mockOptionField.id}-${OTHER_OPTION}`)]:
                'xico'
            })
          })
        })
      })
    })
  })
})
