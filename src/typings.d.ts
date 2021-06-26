/**
 * Default CSS definition for typescript,
 * will be overridden with file-specific definitions by rollup
 */
declare module '*.css' {
  const content: { [className: string]: string }
  export default content
}

export type GoogleFormField = {
  
}

export type GoogleFormFields = {
  [id: string]: GoogleFormField
}

export type GoogleForm = {
  action: string
  fvv: number
  pageHistory: number
  fbzx: string
  fields: 
}

interface SvgrComponent
  extends React.StatelessComponent<React.SVGAttributes<SVGElement>> {}

declare module '*.svg' {
  const svgUrl: string
  const svgComponent: SvgrComponent
  export default svgUrl
  export { svgComponent as ReactComponent }
}
