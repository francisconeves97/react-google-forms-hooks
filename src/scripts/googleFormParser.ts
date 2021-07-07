import cheerio from 'cheerio'
import axios from 'axios'

import {
  GoogleForm,
  Field,
  Fields,
  CustomizableOption,
  Option
} from '../types/form'

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

const parseFieldType = (rawField: Array<any>, fieldId: number) => {
  const fieldTypes = [
    'SHORT_ANSWER',
    'LONG_ANSWER',
    'RADIO',
    'DROPDOWN',
    'CHECKBOX',
    'LINEAR'
  ] as const

  if (fieldId === 7) {
    if (parseGridMultiSelect(rawField) === 1) {
      return 'CHECKBOX_GRID'
    } else {
      return 'RADIO_GRID'
    }
  }

  return fieldTypes[fieldId]
}

const parseOptions = (options: Array<any>): Array<Option> => {
  return options.map((rawOption) => ({ label: rawOption[0] }))
}

const parseCustomizableOptions = (
  options: Array<any>
): Array<CustomizableOption> => {
  return options.map((rawOption) => ({
    label: rawOption[0],
    custom: rawOption[4] === 1
  }))
}

const parseGridOptions = (options: Array<Array<string>>): Array<Option> => {
  return options.map((o) => ({ label: o[0] }))
}

const toBool = (n: number): boolean => n === 1

const parseField = (rawField: Array<any>): Field => {
  const field = <Field>{}

  field.label = rawField[1]

  const fieldId = rawField[3]
  field.type = parseFieldType(rawField, fieldId)

  switch (field.type) {
    case 'SHORT_ANSWER':
    case 'LONG_ANSWER': {
      const fieldInfo = rawField[4][0]
      field.id = fieldInfo[0]
      field.required = toBool(fieldInfo[2])
      break
    }
    case 'CHECKBOX':
    case 'RADIO': {
      const fieldInfo = rawField[4][0]
      field.id = fieldInfo[0]
      field.options = parseCustomizableOptions(fieldInfo[1])
      field.hasCustom = field.options.some((o) => o.custom)
      field.required = toBool(fieldInfo[2])
      break
    }
    case 'DROPDOWN': {
      const fieldInfo = rawField[4][0]
      field.id = fieldInfo[0]
      field.options = parseOptions(fieldInfo[1])
      field.required = toBool(fieldInfo[2])
      break
    }
    case 'LINEAR': {
      const fieldInfo = rawField[4][0]
      field.id = fieldInfo[0]
      const [labelFirst, labelLast] = fieldInfo[3]
      field.legend = { labelFirst, labelLast }
      field.options = parseGridOptions(fieldInfo[1])
      field.required = toBool(fieldInfo[2])
      break
    }
    case 'CHECKBOX_GRID':
    case 'RADIO_GRID':
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

  console.log(JSON.stringify(googleForm))

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
