const { googleFormsToJson } = require('react-google-forms')
const fs = require('fs')
const path = require('path')

const saveJsonToFile = (filename, json) => {
  const filePath = path.resolve(__dirname, filename)
  fs.writeFile(filePath, JSON.stringify(json), 'utf8', function (err) {
    if (err) throw err
  })
}

const run = async () => {
  const result = await googleFormsToJson(
    'https://docs.google.com/forms/d/e/1FAIpQLSe5U3qvg8WHs4nkU-e6h2RlAD7fKoCkou6HO2w2-tXYIA_F8g/viewform'
  )
  saveJsonToFile('form.json', result)
}

run()

export default {
  fvv: 1,
  pageHistory: 0,
  fbzx: '4367206215934512302',
  action: 'e/1FAIpQLSe5U3qvg8WHs4nkU-e6h2RlAD7fKoCkou6HO2w2-tXYIA_F8g',
  fields: [
    {
      label: 'Do you want to give some feedback?',
      type: 'LONG_ANSWER',
      id: '1864908950',
      required: false
    }
  ],
  fieldsOrder: {
    1864908950: 2
  }
}
