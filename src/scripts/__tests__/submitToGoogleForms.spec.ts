import { GoogleForm } from '../../index'
import fetch from '../../__mocks__/isomorphic-unfetch'
import { submitToGoogleForms } from '../submitToGoogleForms'

describe('submitToGoogleForms', () => {
  const stubForm: GoogleForm = {
    action: 'action',
    fvv: 0,
    pageHistory: 0,
    fbzx: 'fbzx',
    fields: [],
    fieldsOrder: {}
  }
  const stubFormData = {
    id1: 'id1value',
    id2: 'id2value'
  }

  afterEach(() => {
    fetch.mockClear()
  })

  it('calls google forms with the correct params', async () => {
    await submitToGoogleForms(stubForm, stubFormData)

    expect(fetch).toHaveBeenCalledWith(
      'https://docs.google.com/forms/d/action/formResponse?submit=Submit&entry.id1=id1value&entry.id2=id2value',
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        method: 'GET',
        mode: 'no-cors'
      }
    )
  })

  describe('when there is an id that is from custom answer', () => {
    const stubFormData = {
      id1: 'id1value',
      id2: 'id2value',
      id3: '__other_option__',
      ['id3-__other_option__-other_option_response']: 'id3value'
    }

    it('calls google forms with the correct params for the customer answer', async () => {
      await submitToGoogleForms(stubForm, stubFormData)

      expect(fetch).toHaveBeenCalledWith(
        'https://docs.google.com/forms/d/action/formResponse?submit=Submit&entry.id1=id1value&entry.id2=id2value&entry.id3=__other_option__&entry.id3.other_option_response=id3value',
        {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          method: 'GET',
          mode: 'no-cors'
        }
      )
    })
  })

  describe('when the call to google forms is successful', () => {
    beforeEach(() => {
      fetch.mockResolvedValue({
        ok: true,
        status: 200
      })
    })

    it('returns true', async () => {
      const result = await submitToGoogleForms(stubForm, stubFormData)

      expect(result).toBe(true)
    })
  })

  describe('when the call to google forms is not successful', () => {
    beforeEach(() => {
      fetch.mockResolvedValue({
        ok: true,
        status: 400
      })
    })

    it('returns false', async () => {
      const result = await submitToGoogleForms(stubForm, stubFormData)

      expect(result).toBe(false)
    })
  })
})
