import json from '../example/src/form.json'

export type UseGoogleFormProps = {
  form: object
  components: {
    checkbox: any
  }
}

export default function useGoogleForm({ form }: UseGoogleFormProps) {}
