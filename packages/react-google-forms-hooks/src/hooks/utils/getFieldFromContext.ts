import { UseGoogleFormReturn, FieldTypes } from '../../types'

export default (
  context: UseGoogleFormReturn | null,
  id: string,
  type: FieldTypes
) => {
  if (context === null) {
    throw new Error('You need to wrap your form with a GoogleFormProvider')
  }

  const field = context.getField(id)

  if (field.type !== type) {
    throw new Error(`Field with id ${field.id} is not of type ${type}`)
  }

  return field
}
