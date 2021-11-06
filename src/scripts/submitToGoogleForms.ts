import { formatQuestionName, GOOGLE_FORMS_URL } from '../hooks/useGoogleForm'
import { GoogleForm } from '../types'

export const submitToGoogleForms = async (
  form: GoogleForm,
  formData: object
) => {
  const params = new URLSearchParams()
  Object.keys(formData).forEach((key) => {
    if (formData[key]) {
      params.append(formatQuestionName(key), formData[key])
    }
  })

  return fetch(
    `${GOOGLE_FORMS_URL}/${form.action}/formResponse?${params.toString()}&submit=Submit`,
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      mode: 'no-cors',
      method: 'GET'
    }
  )
}
