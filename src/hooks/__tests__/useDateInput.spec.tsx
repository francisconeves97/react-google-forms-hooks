import React from 'react'
import { RegisterOptions } from 'react-hook-form'
import { renderHook } from '@testing-library/react-hooks'
import { render, fireEvent, screen, act } from '@testing-library/react'

import { DateField } from '../../types'
import { useDateInput } from '../useDateInput'
import {
  MockGoogleFormComponent,
  mockGetField,
  submitForm
} from './helpers/utils'

describe('useDateInput', () => {
  const mockDateInputField: DateField = {
    id: 'date_input',
    label: 'Date input Question',
    type: 'DATE',
    required: false,
    year: false,
    hour: false
  }
  let output = {}
  const onSubmit = (data: object) => {
    output = data
  }

  const DateInputComponent = (props: { options?: RegisterOptions }) => {
    const {
      registerDay,
      registerMonth,
      registerYear,
      registerHour,
      registerMinute,
      error
    } = useDateInput(mockDateInputField.id)

    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div>
          <div>Day</div>
          <input type='text' aria-label='day' {...registerDay(props.options)} />
        </div>
        <div>
          <div>Month</div>
          <input
            type='text'
            aria-label='month'
            {...registerMonth(props.options)}
          />
        </div>
        {registerYear && (
          <div>
            <div>Year</div>
            <input
              type='text'
              aria-label='year'
              {...registerYear(props.options)}
            />
          </div>
        )}
        {registerHour && (
          <div>
            <div>Hour</div>
            <input
              type='text'
              aria-label='hour'
              {...registerHour(props.options)}
            />
          </div>
        )}
        {registerMinute && (
          <div>
            <div>Minute</div>
            <input
              type='text'
              aria-label='minute'
              {...registerMinute(props.options)}
            />
          </div>
        )}
        {error?.type === 'validate' && <span>Date is invalid</span>}
        {error?.type === 'required' && <span>Date is required</span>}
      </div>
    )
  }

  const renderComponent = (options?: RegisterOptions) =>
    render(
      <MockGoogleFormComponent onSubmit={onSubmit}>
        <DateInputComponent options={options}></DateInputComponent>
      </MockGoogleFormComponent>
    )

  const fillTextField = async (value: string, name: string) => {
    await act(async () => {
      fireEvent.change(screen.getByRole('textbox', { name }), {
        target: { value: value }
      })
    })
  }

  const fillDayField = async (value: string) => fillTextField(value, 'day')
  const fillMonthField = async (value: string) => fillTextField(value, 'month')
  const fillYearField = async (value: string) => fillTextField(value, 'year')
  const fillHourField = async (value: string) => fillTextField(value, 'hour')
  const fillMinuteField = async (value: string) =>
    fillTextField(value, 'minute')

  beforeEach(() => {
    mockGetField.mockImplementation(() => mockDateInputField)
  })

  afterEach(() => {
    output = {}
  })

  it('returns the correspondent field information', () => {
    const { result } = renderHook(() => useDateInput(mockDateInputField.id), {
      wrapper: MockGoogleFormComponent
    })

    expect(result.current).toMatchObject(mockDateInputField)
  })

  it('registers the field correctly', async () => {
    renderComponent()

    await fillDayField('1')
    await fillMonthField('2')

    await submitForm()

    expect(output).toMatchInlineSnapshot(`
      Object {
        "date_input_day": "1",
        "date_input_month": "2",
      }
    `)
  })

  describe('when the field has year', () => {
    beforeEach(() => {
      mockGetField.mockImplementation(() => ({
        ...mockDateInputField,
        year: true
      }))
    })

    it('registers the field correctly', async () => {
      renderComponent()

      await fillDayField('1')
      await fillMonthField('2')
      await fillYearField('2000')

      await submitForm()

      expect(output).toMatchInlineSnapshot(`
        Object {
          "date_input_day": "1",
          "date_input_month": "2",
          "date_input_year": "2000",
        }
      `)
    })

    describe('when some date field is not filled', () => {
      it('gives a validation error', async () => {
        renderComponent()

        await fillDayField('1')

        await submitForm()

        expect(screen.getByText('Date is invalid')).toBeVisible()
      })
    })

    describe('when the year is invalid', () => {
      it('gives a validation error', async () => {
        renderComponent()

        await fillDayField('1')
        await fillMonthField('2')
        await fillYearField('invalid')

        await submitForm()

        expect(screen.getByText('Date is invalid')).toBeVisible()
      })
    })
  })

  describe('when the field has hour', () => {
    beforeEach(() => {
      mockGetField.mockImplementation(() => ({
        ...mockDateInputField,
        hour: true
      }))
    })

    it('registers the field correctly', async () => {
      renderComponent()

      await fillDayField('1')
      await fillMonthField('2')
      await fillHourField('3')
      await fillMinuteField('4')

      await submitForm()

      expect(output).toMatchInlineSnapshot(`
        Object {
          "date_input_day": "1",
          "date_input_hour": "3",
          "date_input_minute": "4",
          "date_input_month": "2",
        }
      `)
    })
  })

  describe('when the field has year and hour', () => {
    beforeEach(() => {
      mockGetField.mockImplementation(() => ({
        ...mockDateInputField,
        year: true,
        hour: true
      }))
    })

    it('registers the field correctly', async () => {
      renderComponent()

      await fillDayField('1')
      await fillMonthField('2')
      await fillYearField('2000')
      await fillHourField('3')
      await fillMinuteField('4')

      await submitForm()

      expect(output).toMatchInlineSnapshot(`
        Object {
          "date_input_day": "1",
          "date_input_hour": "3",
          "date_input_minute": "4",
          "date_input_month": "2",
          "date_input_year": "2000",
        }
      `)
    })
  })

  describe('when the field is required', () => {
    beforeEach(() => {
      mockGetField.mockImplementation(() => ({
        ...mockDateInputField,
        required: true
      }))
    })

    it('gives an error when the field is not filled', async () => {
      renderComponent()

      await submitForm()

      expect(screen.getByText('Date is required')).toBeVisible()
    })

    describe('when some fields are filled and others are not', () => {
      it('gives an error saying the date is invalid', async () => {
        renderComponent()

        await fillDayField('1')

        await submitForm()

        expect(screen.getByText('Date is invalid')).toBeVisible()
      })
    })
  })

  // describe('when other validations are passed to the register method', () => {
  //   it('submits the form successfully when it does comply with the validation', async () => {
  //     renderComponent({ minLength: 3 })

  //     await fillTextField('xico')

  //     await submitForm()

  //     expect(output).toEqual({
  //       [mockTextAnswerField.id]: 'xico'
  //     })
  //   })

  //   it('gives a validation error when it does not comply with the validation', async () => {
  //     renderComponent({ minLength: 3 })

  //     await fillTextField('xi')

  //     await submitForm()

  //     expect(screen.getByText('Error minLength')).toBeVisible()
  //   })
  // })
})
