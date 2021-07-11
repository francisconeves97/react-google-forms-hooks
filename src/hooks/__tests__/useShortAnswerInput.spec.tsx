import { renderHook } from '@testing-library/react-hooks'

import { useShortAnswerInput } from '../useShortAnswerInput'
import exampleForm from './examples/form1.json'

describe('useShortAnswerInput', () => {
  const wrapper = ({ children }: { children?: React.ReactNode }) => (
    // @ts-ignore
    <GoogleFormProvider register={mockRegister} getField={mockGetField}>
      {children}
    </GoogleFormProvider>
  )
  describe("when the form isn't wrapped in a GoogleFormProvider", () => {
    it('throws an error', () => {
      const { result } = renderHook(() => useShortAnswerInput('id'))

      expect(result.error).toEqual(
        Error('You need to wrap your form with a GoogleFormProvider')
      )
    })
  })

  describe('when the passed id does not exist in the form', () => {
    it('throws an error', () => {
      const { result } = renderHook(() => useShortAnswerInput('id'))

      expect(result.error).toEqual(
        Error('You need to wrap your form with a GoogleFormProvider')
      )
    })
  })
})
