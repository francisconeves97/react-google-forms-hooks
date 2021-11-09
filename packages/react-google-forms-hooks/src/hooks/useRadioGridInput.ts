import useGridInput from './utils/useGridInput'

export const useRadioGridInput = (id: string) => {
  return useGridInput(id, 'RADIO_GRID')
}
