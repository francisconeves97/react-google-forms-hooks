import { renderHook } from '@testing-library/react-hooks'

import { useGoogleFormContext } from '../../useGoogleFormContext'
import getFieldFromContext from '../../utils/getFieldFromContext'
import { getContextWrapper } from '../utils'

describe('getFieldFromContext', () => {
  const field: { type: 'SHORT_ANSWER'; id: string } = {
    type: 'SHORT_ANSWER',
    id: 'test'
  }
  const mockGetField = jest.fn(() => field)

  it('returns the field from context', () => {
    const { result } = renderHook(() => useGoogleFormContext(), {
      wrapper: getContextWrapper({ getField: mockGetField })
    })

    expect(getFieldFromContext(result.current, field.id, field.type)).toBe(
      field
    )
  })

  describe("when the form isn't wrapped in a GoogleFormProvider", () => {
    it('throws an error', () => {
      const { result } = renderHook(() => useGoogleFormContext())

      expect(() =>
        getFieldFromContext(result.current, 'test', 'LONG_ANSWER')
      ).toThrowError()
    })
  })

  describe("when the returned field isn't of the given type", () => {
    it('throws an error', () => {
      const { result } = renderHook(() => useGoogleFormContext(), {
        wrapper: getContextWrapper({ getField: mockGetField })
      })

      expect(() =>
        getFieldFromContext(result.current, field.id, 'LONG_ANSWER')
      ).toThrowError()
    })
  })
})
