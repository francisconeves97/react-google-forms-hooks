import { act, renderHook } from '@testing-library/react-hooks'

import { useGoogleFormContext } from '../useGoogleFormContext'
import { getContextWrapper } from './helpers/utils'

describe('GoogleFormProvider', () => {
  it('has access to all methods in context using useGoogleFormContext', () => {
    const mockRegister = jest.fn()
    const mockGetField = jest.fn()

    const { result } = renderHook(() => useGoogleFormContext(), {
      /* eslint-disable-next-line react/display-name */
      wrapper: getContextWrapper({
        register: mockRegister,
        getField: mockGetField
      })
    })

    const { register, getField } = result.current!

    const arg = 'xico'
    act(() => {
      register(arg)
      getField(arg)
    })

    expect(mockRegister).toBeCalledWith(arg)
    expect(mockGetField).toBeCalledWith(arg)
  })
})
