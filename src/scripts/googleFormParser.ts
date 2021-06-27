import cheerio from 'cheerio'
const axios = require('axios').default

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

const extractForm = (html: string) => {
  const $ = cheerio.load(html)
  const fbzx = $('[name="fbzx"]').attr('value')

  if (!fbzx) {
    throw new Error(`Invalid form. Couldn't find fbzx field.`)
  }

  const scriptStringIdentifier = 'var FB_PUBLIC_LOAD_DATA_ ='
  let scriptHtml = $('script')
    .filter((_, el) => {
      return $(el)!.html()!.includes(scriptStringIdentifier)
    })
    .first()
    .html()

  if (!scriptHtml) {
    throw new Error(`Invalid form. Couldn't find script tag.`)
  }

  scriptHtml = scriptHtml.replace(';', '')
  scriptHtml = scriptHtml.replace(scriptStringIdentifier, '')

  const formDataRaw = JSON.parse(scriptHtml)
  return formDataRaw
}

const googleFormToJson = async (formUrl: string) => {
  assertValidUrl(formUrl)

  let html
  try {
    html = await getFormHtml(formUrl)
  } catch (err: any) {
    console.error(err)
    throw new Error(`Failed to fetch form. ${err}`)
  }

  return extractForm(html)
}

googleFormToJson(
  'https://docs.google.com/forms/d/e/1FAIpQLSe5U3qvg8WHs4nkU-e6h2RlAD7fKoCkou6HO2w2-tXYIA_F8g/viewform'
)

module.exports = {
  googleFormToJson
}
