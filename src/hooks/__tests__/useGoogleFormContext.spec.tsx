import React from 'react'
import { act, renderHook } from '@testing-library/react-hooks'

import {
  GoogleFormProvider,
  useGoogleFormContext
} from '../useGoogleFormContext'

describe('GoogleFormProvider', () => {
  it('has access to all methods in context using useGoogleFormContext', () => {
    const mockRegister = jest.fn()
    const mockGetField = jest.fn()

    const { result } = renderHook(() => useGoogleFormContext(), {
      /* eslint-disable-next-line react/display-name */
      wrapper: ({ children }: { children?: React.ReactNode }) => (
        // @ts-ignore
        <GoogleFormProvider register={mockRegister} getField={mockGetField}>
          {children}
        </GoogleFormProvider>
      )
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
