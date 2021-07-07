import cheerio from 'cheerio'
import axios from 'axios'

import { GoogleForm, Field, Fields } from '../types/form'

type FormData = {
  formData: object
  fbzx: string
}

const assertValidUrl = (formUrl: string) => {
  const googleFormsHost = 'docs.google.com'
  const url = new URL(formUrl)

  if (url.host !== googleFormsHost) {
    throw new Error(
      `Invalid google forms host. It must be ${googleFormsHost} and is ${url.host}.`
    )
  }

  if (!url.pathname.endsWith('/viewform')) {
    throw new Error(`Please use the form's public URL.`)
  }
}

const getFormHtml = async (formUrl: string) => {
  const html = await axios.get(formUrl)
  return html.data
}

const extractFormData = (html: string): FormData => {
  const $ = cheerio.load(html)
  const fbzx = $('[name="fbzx"]').attr('value')

  if (!fbzx) {
    throw new Error(`Invalid form. Couldn't find fbzx field.`)
  }

  const scriptStringIdentifier = 'var FB_PUBLIC_LOAD_DATA_ ='
  let scriptHtml = $('script')
    .filter((_, el) => {
      return $(el).html()!.includes(scriptStringIdentifier)
    })
    .first()
    .html()

  if (!scriptHtml) {
    throw new Error(`Invalid form. Couldn't find script tag.`)
  }

  scriptHtml = scriptHtml.replace(';', '')
  scriptHtml = scriptHtml.replace(scriptStringIdentifier, '')

  const formDataRaw = JSON.parse(scriptHtml)

  return { formData: formDataRaw, fbzx }
}

const parseGridMultiSelect = (rawField: Array<any>): 1 | 0 => {
  const firstLine = rawField[4][0]
  const canSelectMultiple = firstLine[11][0]

  return canSelectMultiple
}

const parseField = (rawField: Array<any>): Field => {
  const field = <Field>{}

  field.id = rawField[0]
  field.label = rawField[1]

  const fieldId = rawField[3]

  switch (fieldId) {
    case 0:
      field.type = 'SHORT_ANSWER'
      break
    case 1:
      field.type = 'LONG_ANSWER'
      break
    case 2:
      field.type = 'RADIO'
      break
    case 3:
      field.type = 'DROPDOWN'
      break
    case 4:
      field.type = 'CHECKBOX'
      break
    case 5:
      field.type = 'LINEAR'
      break
    case 7:
      if (parseGridMultiSelect(rawField) === 1) {
        field.type = 'CHECKBOX_GRID'
      } else {
        field.type = 'RADIO_GRID'
      }
      break

    default:
      break
  }

  return field
}

const parseFields = (rawFields: Array<any>): Fields => {
  const fields = <Fields>{}

  rawFields.forEach((rawField: Array<any>) => {
    const field = parseField(rawField)
    fields[field.id] = field
  })

  return fields
}

const parseFormData = ({ formData, fbzx }: FormData): GoogleForm => {
  const googleForm = <GoogleForm>{}

  googleForm.fvv = 1
  googleForm.pageHistory = 0
  googleForm.fbzx = fbzx
  googleForm.action = formData[14]

  googleForm.fields = parseFields(formData[1][1])

  console.log(JSON.stringify(formData))
  console.log(googleForm)

  return googleForm
}

const googleFormToJson = async (formUrl: string) => {
  assertValidUrl(formUrl)

  let html
  try {
    html = await getFormHtml(formUrl)
  } catch (err: any) {
    throw new Error(`Failed to fetch form. ${err}`)
  }

  const formData = extractFormData(html)
  return parseFormData(formData)
}

googleFormToJson(
  'https://docs.google.com/forms/d/e/1FAIpQLSe5U3qvg8WHs4nkU-e6h2RlAD7fKoCkou6HO2w2-tXYIA_F8g/viewform'
)

module.exports = {
  googleFormToJson
}
