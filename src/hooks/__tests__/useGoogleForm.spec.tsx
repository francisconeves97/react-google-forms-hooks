import { renderHook } from '@testing-library/react-hooks'
import { GoogleForm } from '../../types'

import { useGoogleForm } from '../useGoogleForm'
import exampleForm from './examples/form1.json'

describe('useGoogleForm', () => {
  it('returns methods from react-hook-form', () => {
    const { result } = renderHook(() =>
      useGoogleForm({ form: exampleForm as GoogleForm })
    )

    const { register, watch } = result.current

    expect(register).toBeDefined()
    expect(watch).toBeDefined()
  })

  it('returns the getField method', () => {
    const { result } = renderHook(() =>
      useGoogleForm({ form: exampleForm as GoogleForm })
    )

    const { getField } = result.current

    expect(getField).toBeDefined()
  })

  describe('getField', () => {
    it('returns the field with the given id', () => {
      const { result } = renderHook(() =>
        useGoogleForm({ form: exampleForm as GoogleForm })
      )

      const { getField } = result.current

      const field = exampleForm.fields[0]
      const returnedField = getField(field.id)

      expect(returnedField).toBe(field)
    })

    describe('when the field with the given id does not exist', () => {
      it('throws an error', () => {
        const { result } = renderHook(() =>
          useGoogleForm({ form: exampleForm as GoogleForm })
        )

        const { getField } = result.current

        expect(() => getField('non_existing_id')).toThrowError()
      })
    })
  })
})
