import useTextInput from './utils/useTextInput'

export const useLongAnswerInput = (id: string) => {
  return useTextInput(id, 'LONG_ANSWER')
}
