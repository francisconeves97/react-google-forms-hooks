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
      // We need to catch the error here because of CORS
      // However the form will still be submitted to Google Forms if every field is correct
      // Otherwise we don't have observability if the form submission failed.
      // TODO: we could implement the suggestion on this stackoverflow about having an invisible iframe
      // to perform the submission https://stackoverflow.com/a/61359999/13194919
      return
    }
  }

  methods.submitToGoogleForms = submitToGoogleForms

  return methods
}
