import useTextInput from './utils/useTextInput'

export const useShortAnswerInput = (id: string) => {
  return useTextInput(id, 'SHORT_ANSWER')
}
