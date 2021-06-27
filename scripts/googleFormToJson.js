const got = require('got')
const fs = require('fs')
const path = require('path')

const GOOGLE_FORMS_EXPORTER_URL =
  'https://google-form-exporter.herokuapp.com/formdress?url='
const GOOGLE_FORMS_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSe5U3qvg8WHs4nkU-e6h2RlAD7fKoCkou6HO2w2-tXYIA_F8g/viewform'

const mapShortAnswer = (field) => {
  const { id, required } = field.widgets[0]
  return {
    id,
    label: field.label,
    type: 'SHORT_ANSWER',
    required
  }
}

const mapLongAnswer = (field) => {
  const { id, required } = field.widgets[0]
  return {
    id,
    label: field.label,
    type: 'LONG_ANSWER',
    required
  }
}

const mapRadioAnswer = (field) => {
  const { id, required, options } = field.widgets[0]
  const hasCustom = options.some((o) => o.custom)

  return {
    id,
    label: field.label,
    type: 'RADIO',
    required,
    options: options.filter((o) => !o.custom),
    hasCustom
  }
}

const mapDropdownAnswer = (field) => {
  const { id, required, options } = field.widgets[0]
  return {
    id,
    label: field.label,
    type: 'DROPDOWN',
    required,
    options
  }
}

const mapCheckboxAnswer = (field) => {
  const { id, required, options } = field.widgets[0]
  const hasCustom = options.some((o) => o.custom)

  return {
    id,
    label: field.label,
    type: 'CHECKBOX',
    required,
    hasCustom,
    options: options.filter((o) => !o.custom)
  }
}

const mapLinearAnswer = (field) => {
  const { id, required, options, legend } = field.widgets[0]
  return {
    id,
    label: field.label,
    type: 'LINEAR',
    required,
    options,
    legend
  }
}

const mapGridLine = (widget) => {
  const { id, name } = widget
  return {
    id,
    name
  }
}

const mapGridAnswer = (field) => {
  const { id, required, columns } = field.widgets[0]
  return {
    id,
    label: field.label,
    type: 'GRID',
    required,
    columns,
    lines: field.widgets.map(mapGridLine)
  }
}

const mapField = (field) => {
  const { typeid } = field
  switch (typeid) {
    case 0:
      return mapShortAnswer(field)
    case 1:
      return mapLongAnswer(field)
    case 2:
      return mapRadioAnswer(field)
    case 3:
      return mapDropdownAnswer(field)
    case 4:
      return mapCheckboxAnswer(field)
    case 5:
      return mapLinearAnswer(field)
    case 7:
      return mapGridAnswer(field)
    default:
  }
}

const saveJsonToFile = (filename, json) => {
  const filePath = path.resolve(__dirname, filename)
  fs.writeFile(filePath, JSON.stringify(json), 'utf8', function (err) {
    if (err) throw err
  })
}

const getFieldsById = (fieldsArray) => {
  return fieldsArray.reduce(
    (acc, field) => ({
      ...acc,
      [`${field.id}`]: field
    }),
    {}
  )
}

const getFormJson = async () => {
  const response = await got(`${GOOGLE_FORMS_EXPORTER_URL}${GOOGLE_FORMS_URL}`)
  const body = JSON.parse(response.body)

  const fieldsArray = body.fields.map(mapField)
  const result = {
    action: body.action,
    fvv: 1,
    pageHistory: 0,
    fbzx: body.fbzx,
    fields: getFieldsById(fieldsArray)
  }
  saveJsonToFile('form.json', result)
  return body
}

getFormJson()
