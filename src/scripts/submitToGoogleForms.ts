import fetch from 'isomorphic-unfetch'
import { GoogleForm } from '../types'
import { OTHER_OPTION, OTHER_OPTION_RESPONSE } from '../hooks/utils/useCustomOptionField'

export const GOOGLE_FORMS_URL = 'https://docs.google.com/forms/d'

export const formatQuestionName = (id: string) => {
  if (id.includes(OTHER_OPTION_RESPONSE)) {
    return `entry.${id.replace(
      `-${OTHER_OPTION}-${OTHER_OPTION_RESPONSE}`,
      ''
    )}.${OTHER_OPTION_RESPONSE}`
  }

  return `entry.${id}`
}

export const submitToGoogleForms = async (
  form: GoogleForm,
  formData: object
) => {
  const urlParams = new URLSearchParams()
  Object.keys(formData).forEach((key) => {
    if (formData[key]) {
      urlParams.append(formatQuestionName(key), formData[key])
    }
  })

  const fetchedResult = await fetch(
    `${GOOGLE_FORMS_URL}/${
      form.action
    }/formResponse?submit=Submit&${urlParams.toString()}`,
    {
      method: 'GET',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
  )
  if (!fetchedResult.ok || fetchedResult.status >= 300) {
    console.warn('the result of GoogleForm is not correct.', fetchedResult)
  }
}
