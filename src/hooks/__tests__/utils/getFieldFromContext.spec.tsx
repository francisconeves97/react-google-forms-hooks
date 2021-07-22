import { GetField, UseGoogleFormReturn } from '../../../types'
import getFieldFromContext from '../../utils/getFieldFromContext'

describe('getFieldFromContext', () => {
  const mockContext = {
    getField: jest.fn() as jest.Mocked<GetField>
  } as UseGoogleFormReturn
  const mockGetField = mockContext.getField as jest.Mock

  describe('when the provided context is null', () => {
    it('throws an error', () => {
      expect(() =>
        getFieldFromContext(null, 'id', 'SHORT_ANSWER')
      ).toThrowError()
    })
  })

  describe('when the field type is not the provided type', () => {
    beforeEach(() => {
      mockGetField.mockImplementationOnce(() => ({
        id: 'id',
        type: 'SHORT_ANSWER',
        label: 'mock',
        required: false
      }))
    })

    it('throws an error', () => {
      expect(() =>
        getFieldFromContext(mockContext, 'id', 'LONG_ANSWER')
      ).toThrowError()
    })
  })

  describe('when the given field exists', () => {
    const stubField = {
      id: 'id',
      type: 'SHORT_ANSWER',
      label: 'mock',
      required: false
    }
    beforeEach(() => {
      mockGetField.mockImplementationOnce(() => stubField)
    })

    it('returns the field', () => {
      const field = getFieldFromContext(mockContext, 'id', 'SHORT_ANSWER')
      expect(field).toBe(stubField)
    })
  })
})
