import { DropdownField } from "@gforms-js/types";
import { useGoogleFormContext } from "./context/google-form-context";
import { assertContextDefined } from "./helpers/assert-context-defined";
import { slugify } from "./helpers/slugify";

import { OptionWithId, RegisterFunction, UseFieldHookReturn } from "./types";

type UseDropdownInputReturn = Omit<
  UseFieldHookReturn<DropdownField>,
  "options"
> & {
  options: OptionWithId[];
};

const useDropdownInput = (id: string): UseDropdownInputReturn => {
  const context = useGoogleFormContext();

  assertContextDefined(context);

  const field = context.getField(id) as DropdownField;

  const register: RegisterFunction = (options) =>
    context.register(id, { required: field.required, ...options });

  const error = context.formState.errors[field.id];

  const buildId = (value: string) => {
    return `${field.id}-${slugify(value)}`;
  };

  const options = field.options.map((o) => {
    const id = buildId(o.label);
    return {
      ...o,
      id,
    };
  });

  return { ...field, options, register, error };
};

export { useDropdownInput };
