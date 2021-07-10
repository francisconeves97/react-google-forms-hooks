/**
 * @jest-environment node
 */
import axios from 'axios'
import fs from 'fs'
import path from 'path'

import { googleFormsToJson } from '../googleFormsToJson'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('googleFormsToJson', () => {
  const FORM_URL =
    'https://docs.google.com/forms/d/e/1FAIpQLSe5U3qvg8WHs4nkU-e6h2RlAD7fKoCkou6HO2w2-tXYIA_F8g/viewform'
  describe('example 1', () => {
    beforeEach(() => {
      const exampleForm1 = fs.readFileSync(
        path.join(__dirname, 'examples', 'form1.html'),
        { encoding: 'utf8' }
      )
      mockedAxios.get.mockResolvedValueOnce({ data: exampleForm1 })
    })

    it('should parse the form correctly', async () => {
      const result = await googleFormsToJson(FORM_URL)
      expect(result).toMatchInlineSnapshot(`
        Object {
          "action": "e/1FAIpQLSe5U3qvg8WHs4nkU-e6h2RlAD7fKoCkou6HO2w2-tXYIA_F8g",
          "fbzx": "2765906482982597825",
          "fields": Object {
            "1387297716": Object {
              "hasCustom": true,
              "id": "1387297716",
              "label": "Multiple choice question",
              "options": Array [
                Object {
                  "custom": false,
                  "label": "Opção 1",
                },
                Object {
                  "custom": false,
                  "label": "Opção 2",
                },
                Object {
                  "custom": false,
                  "label": "Opção 3",
                },
                Object {
                  "custom": false,
                  "label": "Opção 4",
                },
                Object {
                  "custom": true,
                  "label": "",
                },
              ],
              "required": true,
              "type": "RADIO",
            },
            "1632852916": Object {
              "columns": Array [
                Object {
                  "label": "Coluna 1",
                },
                Object {
                  "label": "Coluna 2",
                },
                Object {
                  "label": "Coluna 3",
                },
                Object {
                  "label": "Coluna 4",
                },
              ],
              "id": "1632852916",
              "label": "Grid question",
              "lines": Array [
                Object {
                  "id": "1872810205",
                  "label": "Linha 1",
                },
                Object {
                  "id": "540613778",
                  "label": "Linha 2",
                },
                Object {
                  "id": "1477014245",
                  "label": "Linha 3",
                },
              ],
              "type": "RADIO_GRID",
            },
            "1740631530": Object {
              "id": "1740631530",
              "label": "Long answer",
              "required": false,
              "type": "LONG_ANSWER",
            },
            "1999750833": Object {
              "columns": Array [
                Object {
                  "label": "Coluna 1",
                },
                Object {
                  "label": "Coluna 2",
                },
                Object {
                  "label": "Coluna 3",
                },
                Object {
                  "label": "Coluna 4",
                },
              ],
              "id": "1999750833",
              "label": "Multiple choice verification grid",
              "lines": Array [
                Object {
                  "id": "1403312854",
                  "label": "Linha 1",
                },
                Object {
                  "id": "983011973",
                  "label": "Linha 2",
                },
                Object {
                  "id": "1226242907",
                  "label": "Linha 3",
                },
              ],
              "type": "CHECKBOX_GRID",
            },
            "461850935": Object {
              "id": "461850935",
              "label": "Short answer",
              "required": true,
              "type": "SHORT_ANSWER",
            },
            "617310276": Object {
              "columns": Array [
                Object {
                  "label": "Coluna 1",
                },
                Object {
                  "label": "Coluna 2",
                },
                Object {
                  "label": "Coluna 3",
                },
                Object {
                  "label": "Coluna 4",
                },
              ],
              "id": "617310276",
              "label": "Multiple choice grid",
              "lines": Array [
                Object {
                  "id": "1243133950",
                  "label": "Linha 1",
                },
                Object {
                  "id": "146706513",
                  "label": "Linha 2",
                },
                Object {
                  "id": "1808973121",
                  "label": "Linha 3",
                },
              ],
              "type": "RADIO_GRID",
            },
            "705101286": Object {
              "hasCustom": true,
              "id": "705101286",
              "label": "Checkbox question",
              "options": Array [
                Object {
                  "custom": false,
                  "label": "Opção 1",
                },
                Object {
                  "custom": false,
                  "label": "Opção 2",
                },
                Object {
                  "custom": false,
                  "label": "Opção 3",
                },
                Object {
                  "custom": true,
                  "label": "",
                },
              ],
              "required": true,
              "type": "CHECKBOX",
            },
            "718815240": Object {
              "id": "718815240",
              "label": "Linear scale",
              "legend": Object {
                "labelFirst": "Low number",
                "labelLast": "",
              },
              "options": Array [
                Object {
                  "label": "1",
                },
                Object {
                  "label": "2",
                },
                Object {
                  "label": "3",
                },
                Object {
                  "label": "4",
                },
                Object {
                  "label": "5",
                },
              ],
              "required": false,
              "type": "LINEAR",
            },
            "906890030": Object {
              "id": "906890030",
              "label": "Dropdown",
              "options": Array [
                Object {
                  "label": "Opção 1",
                },
                Object {
                  "label": "Opção 2",
                },
                Object {
                  "label": "Opção 3",
                },
                Object {
                  "label": "Opção 4",
                },
                Object {
                  "label": "Opção 5",
                },
              ],
              "required": false,
              "type": "DROPDOWN",
            },
          },
          "fvv": 1,
          "pageHistory": 0,
        }
      `)
    })
  })

  describe('when the form is not from the correct host', () => {
    const INCORRECT_HOST_FORM = 'https://example.com'
    it('throws an error', async () => {
      await expect(googleFormsToJson(INCORRECT_HOST_FORM)).rejects.toThrow()
    })
  })

  describe('when it fails to fetch the page', () => {
    beforeEach(() => {
      mockedAxios.get.mockRejectedValue('error')
    })

    it('throws an error', async () => {
      await expect(googleFormsToJson(FORM_URL)).rejects.toThrow()
    })
  })

  describe('when the form url doesnt correspond to the public url', () => {
    const PRIVATE_FORM_URL = FORM_URL.replace('/viewform', '')

    it('throws an error', async () => {
      await expect(googleFormsToJson(PRIVATE_FORM_URL)).rejects.toThrow()
    })
  })

  describe("when it can't find the fbzx field", () => {
    beforeEach(() => {
      mockedAxios.get.mockResolvedValueOnce({ data: 'incorrect_html' })
    })

    it('throws an error', async () => {
      await expect(googleFormsToJson(FORM_URL)).rejects.toThrow()
    })
  })

  describe("when it can't find the script tag with the form data", () => {
    beforeEach(() => {
      const incorrectForm = fs.readFileSync(
        path.join(__dirname, 'examples', 'incorrectForm.html'),
        { encoding: 'utf8' }
      )
      mockedAxios.get.mockResolvedValueOnce({ data: incorrectForm })
    })

    it('throws an error', async () => {
      await expect(googleFormsToJson(FORM_URL)).rejects.toThrow()
    })
  })
})
