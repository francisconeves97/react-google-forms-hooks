import { LinearScaleField } from "@gforms-js/types";
import { useGoogleFormContext } from "./context/google-form-context";
import { assertContextDefined } from "./helpers/assert-context-defined";
import { slugify } from "./helpers/slugify";
import { OptionInput, RegisterFunction, UseFieldHookReturn } from "./types";

type UseLinearScaleInputReturn = Omit<
  UseFieldHookReturn<LinearScaleField>,
  "options" | "register"
> & {
  options: OptionInput[];
};

const useLinearScaleInput = (id: string): UseLinearScaleInputReturn => {
  const context = useGoogleFormContext();

  assertContextDefined(context);

  const field = context.getField(id) as LinearScaleField;

  const register: RegisterFunction = (options) =>
    context.register(id, { required: field.required, ...options });

  const buildId = (value: string) => {
    return `${field.id}-${slugify(value)}`;
  };

  const error = context.formState.errors[field.id];

  const options = field.options.map((o) => {
    const id = buildId(o.label);
    const registerOption: RegisterFunction = (options) => ({
      ...register(options),
      value: o.label,
    });

    return {
      ...o,
      id,
      register: registerOption,
    };
  });

  return { ...field, options, error };
};

export { useLinearScaleInput };
