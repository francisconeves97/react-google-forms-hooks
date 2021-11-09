import queryString from 'query-string'
import axios from 'axios'

import { formatQuestionName, GOOGLE_FORMS_URL } from '../hooks/useGoogleForm'
import { GoogleForm } from '../types'

export const submitToGoogleForms = async (
  form: GoogleForm,
  formData: object
) => {
  const fields = {}
  Object.keys(formData).forEach((key) => {
    fields[formatQuestionName(key)] = formData[key]
  })

  const params = queryString.stringify(fields, {
    skipNull: true,
    skipEmptyString: true
  })

  return axios.get(
    `${GOOGLE_FORMS_URL}/${form.action}/formResponse?${params}&submit=Submit`,
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
  )
}
