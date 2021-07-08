import * as React from 'react'
import styles from './styles.module.css'

export { googleFormsToJson } from './scripts/googleFormsToJson'

interface Props {
  text: string
}

export const ExampleComponent = ({ text }: Props) => {
  return <div className={styles.test}>Example Component: {text}</div>
}
