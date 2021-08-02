# React Google Forms

## Description

This library allows you to build a UI for your Google Forms using React. It provides a set of tools and hooks to give you a good experience while developing. It's build as a wrapper on top of [react-hook-forms](https://github.com/react-hook-form/react-hook-form).

## Install

```bash
npm install --save react-google-forms
```

## Usage

Use the `googleFormsToJson` script to convert your google form into a json.

```javascript
import { googleFormsToJson } from 'react-google-forms'

const result = await googleFormsToJson(
  'https://docs.google.com/forms/d/e/1FAIpQLSe5U3qvg8WHs4nkU-e6h2RlAD7fKoCkou6HO2w2-tXYIA_F8g/viewform'
)

// result will have a structure in this form
// providing every info necessary to build your form
// {
//   fvv: 1,
//   pageHistory: 0,
//   fbzx: '4367206215934512302',
//   action: 'e/1FAIpQLSe5U3qvg8WHs4nkU-e6h2RlAD7fKoCkou6HO2w2-tXYIA_F8g',
//   fields: [
//     {
//       label: 'Do you want to give some feedback?',
//       type: 'LONG_ANSWER',
//       id: '1864908950',
//       required: false
//     }
//   ],
//   fieldsOrder: {
//     1864908950: 2
//   }
// }
```

Pass the form object to the `useGoogleForm` hook and wrap your form in a `GoogleFormProvider`. Then you can build your custom components to render the form as beautiful as you like.

```javascript
import { GoogleFormProvider, useGoogleForm, useShortAnswerInput } from 'react-google-forms'

import form from './form.json'

export default function ShortAnswerInput({ id }) {
  const { register, label } = useShortAnswerInput(id)

  return (
    <div>
      <p>{label}</p>
      <input type='text' {...register()} />
    </div>
  )
}


const App = () => {
  const methods = useGoogleForm({ form })
  const onSubmit = async (data) => {
    await methods.submitToGoogleForms(data)
  }

  return (
    <GoogleFormProvider {...methods}>
      <Form onSubmit={methods.handleSubmit(onSubmit)}>
        <ShortAnswerInput id='1864908950' />
        <button type='submit'>Submit</button>
      </Form>
    </GoogleFormProvider>
  )
}

export default App
```

You can check a more complete example in the [example](https://github.com/francisconeves97/react-google-forms/tree/master/example) folder.

## Caveats

- Right now there is no observability on errors when submitting a form. See this [comment on the code](https://github.com/francisconeves97/react-google-forms/blob/ca5018e578cfb0e230f9be58dfeee4117db28160/src/hooks/useGoogleForm.ts#L61-L65).
- No support for multi page, sections and images. However you can build your React form with multiple pages, by saving the `data` from `handleSubmit` and only `submitToGoogleForms` on the last page.
- The list of supported inputs doesn't feature every input from google forms. Supported inputs: Short Answer, Long Answer, Checkbox, Radio, Dropdown, Linear, Radio Grid, Checkbox Grid
- Because of CORS you have to run the `googleFormsToJson` script in build time.

## Contributing

This library was born as a result of a side project I did and it is tailored/biased towards my needs. If you have suggestions/improments/ideas feel free to open issues or PRs. :rocket:

## License

MIT © [francisconeves97](https://github.com/francisconeves97)
