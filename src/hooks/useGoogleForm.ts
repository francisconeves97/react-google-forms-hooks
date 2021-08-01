import { useForm } from 'react-hook-form'
import queryString from 'query-string'
import axios from 'axios'

import {
  OTHER_OPTION,
  OTHER_OPTION_RESPONSE
} from './utils/useCustomOptionField'
import { GoogleForm, UseGoogleFormReturn } from '../types'

const GOOGLE_FORMS_URL = 'https://docs.google.com/forms/d'

const resolveField = (id: string, form: GoogleForm) => {
  const fieldIndex = form.fieldsOrder[id]

  if (fieldIndex === undefined) {
    throw new Error(`Field with id ${id} wasn't found in your form`)
  }

  const field = form.fields[fieldIndex]
  return field
}

export const formatQuestionName = (id: string) => {
  console.log(id, 'hereeee')
  if (id.includes(OTHER_OPTION_RESPONSE)) {
    return `entry.${id.replace(
      `-${OTHER_OPTION}-${OTHER_OPTION_RESPONSE}`,
      ''
    )}.${OTHER_OPTION_RESPONSE}`
  }

  return `entry.${id}`
}

export const useGoogleForm = ({ form }: { form: GoogleForm }) => {
  const methods = useForm() as UseGoogleFormReturn

  methods.getField = (id: string) => resolveField(id, form)

  const submitToGoogleForms = async (formData: object) => {
    const fields = {}
    Object.keys(formData).forEach((key) => {
      fields[formatQuestionName(key)] = formData[key]
    })

    const params = queryString.stringify(fields, {
      skipNull: true,
      skipEmptyString: true
    })

    try {
      await axios.get(
        `${GOOGLE_FORMS_URL}/${form.action}/formResponse?${params}&submit=Submit`,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      )
    } catch (err) {
      return
    }
  }

  methods.submitToGoogleForms = submitToGoogleForms

  return methods
}
