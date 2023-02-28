import {
  CheckboxesField,
  GoogleFormField,
  MultipleChoiceField,
  Option,
} from "@google-forms-js/types";
import { OptionInput, RegisterFunction, UseFieldHookReturn } from "../types";

import { useGoogleFormContext } from "../context/google-form-context";
import { assertContextDefined } from "./assert-context-defined";
import { useEffect, useState } from "react";
import { slugify } from "./slugify";

type CustomOptionField = CheckboxesField | MultipleChoiceField;

type CustomOption = Omit<
  OptionInput & {
    registerCustomOptionInput: RegisterFunction;
  },
  "label"
>;

type UseCustomOptionInputReturn<T extends CustomOptionField> = Omit<
  UseFieldHookReturn<T>,
  "options"
> & {
  options: OptionInput[];
  customOption?: CustomOption;
};

const OTHER_OPTION = "__other_option__";
const OTHER_OPTION_RESPONSE = "other_option_response";

const buildCustomFieldId = (id: string) => {
  return `${id}-${OTHER_OPTION_RESPONSE}`;
};

const useCustomOptionInput = <T extends CustomOptionField>(
  id: string
): UseCustomOptionInputReturn<T> => {
  const context = useGoogleFormContext();

  assertContextDefined(context);

  const field = context.getField(id) as CustomOptionField;

  const [customInputRequired, setCustomInputRequired] =
    useState<boolean>(false);

  const register: RegisterFunction = (options) =>
    context.register(id, { required: field.required, ...options });

  const currentValue = context.watch(id);

  useEffect(() => {
    if (field.type === "MULTIPLE_CHOICE") {
      const isCustomOptionSelected =
        currentValue && currentValue === OTHER_OPTION;
      setCustomInputRequired(field.required && isCustomOptionSelected);
    } else if (field.type === "CHECKBOXES") {
      const isCustomOptionSelected =
        currentValue &&
        currentValue.length === 1 &&
        currentValue.includes(OTHER_OPTION);
      setCustomInputRequired(field.required && isCustomOptionSelected);
    }
  }, [currentValue, customInputRequired]);

  const buildId = (value: string) => {
    return `${id}-${slugify(value)}`;
  };

  const buildOptionRegister = (o: Option) => {
    const id = buildId(o.label);
    const registerOption: RegisterFunction = (options) => ({
      ...register({ ...options }),
      value: o.label,
    });

    return {
      ...o,
      id,
      register: registerOption,
    };
  };

  const result = {
    ...field,
    options: field.options.map(buildOptionRegister),
    register,
  } as UseCustomOptionInputReturn<T>;

  if (field.hasCustomOption) {
    const registerOption = (options = {}) => ({
      ...register({ ...options }),
      value: OTHER_OPTION,
    });

    const customOptionId = buildCustomFieldId(id);

    const registerCustomOptionInput = (options = {}) => {
      return context.register(customOptionId, {
        required: customInputRequired,
        ...options,
      });
    };

    const error = context.formState.errors[customOptionId];

    result.customOption = {
      id,
      register: registerOption,
      registerCustomOptionInput,
      error,
    };
  }

  const error = context.formState.errors[field.id];

  return {
    ...(field as GoogleFormField),
    ...result,
    error,
  };
};

export {
  useCustomOptionInput,
  buildCustomFieldId,
  OTHER_OPTION_RESPONSE,
  OTHER_OPTION,
};
