import { useEffect } from 'react'
import { RegisterOptions } from 'react-hook-form'
import { UseDateInputReturn, DateField } from '../types'
import { useGoogleFormContext } from './useGoogleFormContext'
import getFieldFromContext from './utils/getFieldFromContext'

const LEAP_YEAR = '2020'

const isUndefinedOrEmpty = (str?: string): boolean =>
  !str || str.trim().length === 0

export const useDateInput = (id: string): UseDateInputReturn => {
  const context = useGoogleFormContext()
  const { watch, trigger } = context!

  const field = getFieldFromContext(context, id, 'DATE') as DateField

  const dayId = `${id}_day`
  const monthId = `${id}_month`
  const yearId = `${id}_year`
  const hourId = `${id}_hour`
  const minuteId = `${id}_minute`

  const fieldIds = [dayId, monthId, yearId, hourId, minuteId]
  const fieldIdWithError = fieldIds.find(
    (fieldId) => context!.formState.errors[fieldId]
  )

  const error = fieldIdWithError
    ? context!.formState.errors[fieldIdWithError]
    : undefined

  // Not the best performance but need a way to revalidate the different date
  // fields after one of them changes, to have better ux.
  useEffect(
    () => {
      if (error) {
        fieldIds.forEach((fieldId) => {
          trigger(fieldId)
        })
      }
    },
    fieldIds.map((fieldId) => watch(fieldId))
  )

  const validateDate = () => {
    const dateParts = []
    const hourParts = []

    const day = context!.getValues(dayId)
    const month = context!.getValues(monthId)

    if (field.year) {
      const year = context!.getValues(yearId)
      dateParts.push(year)
    } else {
      dateParts.push(LEAP_YEAR)
    }
    dateParts.push(month)
    dateParts.push(day)

    let dateString = dateParts.join('-')

    if (field.hour) {
      const hour = context!.getValues(hourId)
      const minute = context!.getValues(minuteId)
      hourParts.push(hour)
      hourParts.push(minute)

      dateString = `${dateString} ${hourParts.join(':')}`
    }

    const datePartsWithoutDefaultYear = field.year
      ? dateParts
      : [...dateParts].slice(1)

    // When date field is not required, empty dates should be valid
    if (
      !field.required &&
      !datePartsWithoutDefaultYear.some(
        (datePart) => !isUndefinedOrEmpty(datePart)
      ) &&
      !hourParts.some((hourPart) => !isUndefinedOrEmpty(hourPart))
    ) {
      return true
    }

    const date = new Date(dateString)
    const isValidDate = !isNaN(date.getTime())

    return isValidDate
  }

  const buildRegisterFunction = (id: string) => (options?: RegisterOptions) =>
    context!.register(id, {
      required: field.required,
      validate: validateDate,
      ...options
    })

  const registerDay = buildRegisterFunction(`${id}_day`)
  const registerMonth = buildRegisterFunction(`${id}_month`)

  let registerYear
  if (field.year) {
    registerYear = buildRegisterFunction(`${id}_year`)
  }

  let registerHour
  let registerMinute
  if (field.hour) {
    registerHour = buildRegisterFunction(`${id}_hour`)
    registerMinute = buildRegisterFunction(`${id}_minute`)
  }

  return {
    ...field,
    registerDay,
    registerMonth,
    registerYear,
    registerHour,
    registerMinute,
    error
  }
}
