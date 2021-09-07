/**
 * @jest-environment node
 */
import axios from 'axios'
import fs from 'fs'
import path from 'path'

import { googleFormsToJson } from '../googleFormsToJson'
import { mockedParsedForm } from '../__mocks__/mockedParsedForm'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('googleFormsToJson', () => {
  const FORM_URL =
    'https://docs.google.com/forms/d/e/1FAIpQLSe5U3qvg8WHs4nkU-e6h2RlAD7fKoCkou6HO2w2-tXYIA_F8g/viewform'
  const SHORTENED_FORM_URL = 'https://forms.gle/vXSsfKSvpVJc3NMg9'
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
      expect(result).toMatchInlineSnapshot(mockedParsedForm)
    })

    it('should parse the form correctly when is a shortened url', async () => {
      const result = await googleFormsToJson(SHORTENED_FORM_URL)
      expect(result).toMatchInlineSnapshot(mockedParsedForm)
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
