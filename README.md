# React Google Forms Hooks
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-5-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

## Description

This library allows you to build a UI for your Google Forms using React. It provides a set of tools and hooks to give you a good experience while developing. It's build as a wrapper on top of [react-hook-forms](https://github.com/react-hook-form/react-hook-form).

## Live demo

You can check an example form built using this library here: https://francisconeves97.github.io/react-google-forms-hooks/

You can also play around on the example on this [CodeSandbox](https://codesandbox.io/s/pedantic-gould-w0ib1?file=/src/App.js).

## Install

```bash
npm install --save react-google-forms-hooks
```

## Usage

Use the `googleFormsToJson` script to convert your google form into a json and save it into a file.

```javascript
import { googleFormsToJson } from 'react-google-forms-hooks'

// can use both full and shortened form url
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

You can check a more complete example in the [example](https://github.com/francisconeves97/react-google-forms-hooks/blob/master/example/src/App.js) folder.

## Caveats

- Right now there is no observability on errors when submitting a form. See this [comment on the code](https://github.com/francisconeves97/react-google-forms-hooks/blob/ca5018e578cfb0e230f9be58dfeee4117db28160/src/hooks/useGoogleForm.ts#L61-L65).
- You can use the `submitToGoogleForm` export to create a server to handle form submissions. This way you can mitigate the CORS problem.
- No support for multi page, sections, images and other Google Forms functionalities. However you can build your React form with multiple pages, by saving the `data` from `handleSubmit` and only `submitToGoogleForms` on the last page.
- The list of supported inputs doesn't feature every input from Google Forms. Supported inputs: Short Answer, Long Answer, Checkbox, Radio, Dropdown, Linear, Radio Grid, Checkbox Grid
- Because of CORS you have to run the `googleFormsToJson` script in build time.

## Contributing

This library was born as a result of a side project I did and it is tailored towards my needs. If you have suggestions/improvements/ideas feel free to open issues or PRs. :rocket:

## Credits

This library was largely inspired on the work done by @cybercase on the [google-forms-html-exporter](https://github.com/cybercase/google-forms-html-exporter) repo.

## License

MIT © [francisconeves97](https://github.com/francisconeves97)

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/juliangsibecas"><img src="https://avatars.githubusercontent.com/u/25715495?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Julián Gómez Sibecas</b></sub></a><br /><a href="https://github.com/francisconeves97/react-google-forms-hooks/commits?author=juliangsibecas" title="Code">💻</a></td>
    <td align="center"><a href="https://lumen.media"><img src="https://avatars.githubusercontent.com/u/489221?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Dominic Garms</b></sub></a><br /><a href="#ideas-dohomi" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/francisconeves97/react-google-forms-hooks/commits?author=dohomi" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/kbalisnomo"><img src="https://avatars.githubusercontent.com/u/42983430?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Kyle Philip Balisnomo</b></sub></a><br /><a href="https://github.com/francisconeves97/react-google-forms-hooks/commits?author=kbalisnomo" title="Code">💻</a> <a href="https://github.com/francisconeves97/react-google-forms-hooks/issues?q=author%3Akbalisnomo" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/mikemajara"><img src="https://avatars.githubusercontent.com/u/15649320?v=4?s=100" width="100px;" alt=""/><br /><sub><b>mikemajara</b></sub></a><br /><a href="https://github.com/francisconeves97/react-google-forms-hooks/commits?author=mikemajara" title="Code">💻</a> <a href="#ideas-mikemajara" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://github.com/DanielOrtel"><img src="https://avatars.githubusercontent.com/u/19431728?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Daniel Ferenc Balogh</b></sub></a><br /><a href="https://github.com/francisconeves97/react-google-forms-hooks/issues?q=author%3ADanielOrtel" title="Bug reports">🐛</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!