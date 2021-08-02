# React Google Forms

## Description

This library allows you to build a UI for your Google Forms using React. It provides a set of tools and hooks to give you a good experience while developing. It's build as a wrapper on top of [react-hook-forms](https://github.com/react-hook-form/react-hook-form).

## Live demo

You can check an example form built using this library here: https://francisconeves97.github.io/react-google-forms/

You can also play around on the example on this [CodeSandbox](https://codesandbox.io/s/pedantic-gould-w0ib1?file=/src/App.js).

## Install

```bash
npm install --save react-google-forms-hooks
```

## Usage

Use the `googleFormsToJson` script to convert your google form into a json and save it into a file.

```javascript
import { googleFormsToJson } from 'react-google-forms-hooks'

const result = await googleFormsToJson(
  'https://docs.google.com/forms/d/e/1FAIpQLSe5U3qvg8WHs4nkU-e6h2RlAD7fKoCkou6HO2w2-tXYIA_F8g/viewform'
)

console.log(result.fields)
// will output the form fields in an appropriate structure
// [
//   {
//     label: 'Do you want to give some feedback?',
//     type: 'LONG_ANSWER',
//     id: '1864908950',
//     required: false
//   },
//   ...
// ]
```

Pass the form object to the `useGoogleForm` hook and wrap your form in a `GoogleFormProvider`. Then you can build your custom components to render the form as beautiful as you like.

```javascript
import { GoogleFormProvider, useGoogleForm, useShortAnswerInput } from 'react-google-forms-hooks'

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

You can check a more complete example in the [example](https://github.com/francisconeves97/react-google-forms/blob/master/example/src/App.js) folder.

## Caveats

- Right now there is no observability on errors when submitting a form. See this [comment on the code](https://github.com/francisconeves97/react-google-forms/blob/ca5018e578cfb0e230f9be58dfeee4117db28160/src/hooks/useGoogleForm.ts#L61-L65).
- No support for multi page, sections, images and other Google Forms functionalities. However you can build your React form with multiple pages, by saving the `data` from `handleSubmit` and only `submitToGoogleForms` on the last page.
- The list of supported inputs doesn't feature every input from Google Forms. Supported inputs: Short Answer, Long Answer, Checkbox, Radio, Dropdown, Linear, Radio Grid, Checkbox Grid
- Because of CORS you have to run the `googleFormsToJson` script in build time.

## Contributing

This library was born as a result of a side project I did and it is tailored towards my needs. If you have suggestions/improvements/ideas feel free to open issues or PRs. :rocket:

## Credits

This library was largely inspired on the work done by @cybercase on the [google-forms-html-exporter](https://github.com/cybercase/google-forms-html-exporter) repo.

## License

MIT © [francisconeves97](https://github.com/francisconeves97)
