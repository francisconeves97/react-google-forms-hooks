import useGridInput from './utils/useGridInput'

export const useCheckboxGridInput = (id: string) => {
  return useGridInput(id, 'CHECKBOX_GRID')
}
