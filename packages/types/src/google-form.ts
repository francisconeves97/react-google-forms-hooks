interface Option {
  label: string;
}

interface CustomizableOption extends Option {
  custom?: boolean;
}

interface BaseField {
  id: string;
  label: string;
  description?: string;
  required: boolean;
}

interface TextField extends BaseField {
  type: "SHORT_ANSWER" | "LONG_ANSWER";
}

interface DateField extends BaseField {
  type: "DATE";
}

interface CustomOptionField extends BaseField {
  type: "CHECKBOX" | "RADIO";
  options: Array<CustomizableOption>;
}

interface DropdownField extends BaseField {
  type: "DROPDOWN";
  options: Array<Option>;
}

interface Legend {
  labelFirst: string;
  labelLast: string;
}

interface LinearField extends BaseField {
  type: "LINEAR";
  options: Array<Option>;
  legend: Legend;
}

interface Column {
  label: string;
}

interface Line {
  id: string;
  label: string;
}

interface GridField extends BaseField {
  type: "RADIO_GRID" | "CHECKBOX_GRID";
  columns: Array<Column>;
  lines: Array<Line>;
}

type Field =
  | TextField
  | DateField
  | CustomOptionField
  | DropdownField
  | GridField
  | LinearField;

type FieldTypes = Field["type"];

type FieldsOrder = {
  [fieldId: string]: number;
};

type GoogleForm = {
  title: string;
  description?: string;
  action: string;
  fvv: number;
  pageHistory: number;
  fbzx: string;
  fields: Array<Field>;
  fieldsOrder: FieldsOrder;
};

export type {
  Option,
  CustomizableOption,
  BaseField,
  TextField,
  DateField,
  CustomOptionField,
  DropdownField,
  LinearField,
  Column,
  Line,
  GridField,
  Field,
  FieldTypes,
  FieldsOrder,
  GoogleForm,
};
