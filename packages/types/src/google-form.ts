export interface BaseField {
  id: string;
  label: string;
  description?: string;
  required: boolean;
}

export interface Option {
  label: string;
}

export interface ShortAnswerField extends BaseField {
  type: "SHORT_ANSWER";
}

export interface ParagraphField extends BaseField {
  type: "PARAGRAPH";
}

export interface DateField extends BaseField {
  type: "DATE";
}

export interface CustomOptionField extends BaseField {
  options: Option[];
  hasCustomOption: boolean;
}

export interface CheckboxesField extends CustomOptionField {
  type: "CHECKBOXES";
}

export interface MultipleChoiceField extends CustomOptionField {
  type: "MULTIPLE_CHOICE";
  options: Option[];
  hasCustomOption: boolean;
}

export interface DropdownField extends BaseField {
  type: "DROPDOWN";
  options: Option[];
}

export interface LinearScaleField extends BaseField {
  type: "LINEAR_SCALE";
  options: Option[];
  minNumberLabel: string;
  maxNumberLabel: string;
}

export interface GridColumn {
  label: string;
}

export interface GridLine {
  id: string;
  label: string;
}

export interface GridField extends BaseField {
  columns: GridColumn[];
  lines: GridLine[];
}

export interface MultipleChoiceGridField extends GridField {
  type: "MULTIPLE_CHOICE_GRID";
}

export interface TickBoxGrid extends GridField {
  type: "TICK_BOX_GRID";
}

export type Field =
  | ShortAnswerField
  | ParagraphField
  | DateField
  | CheckboxesField
  | MultipleChoiceField
  | DropdownField
  | LinearScaleField
  | MultipleChoiceGridField
  | TickBoxGrid;

export type FieldType = Field["type"];

export interface FieldsPositionMap {
  [fieldId: string]: number;
}

export interface GoogleForm {
  title: string;
  description?: string;
  formMetadata: {
    action: string;
    fvv: number;
    pageHistory: number;
    fbzx: string;
  };
  fields: Field[];
  fieldsPositionMap: FieldsPositionMap;
}
