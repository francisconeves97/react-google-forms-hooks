import React from "react";
import { RegisterOptions } from "react-hook-form";
import { renderHook } from "@testing-library/react";
import { render, fireEvent, screen, act } from "@testing-library/react";

import { CheckboxesField, MultipleChoiceField } from "@google-forms-js/types";
import {
  buildCustomFieldId,
  OTHER_OPTION_RESPONSE,
  useCustomOptionInput,
} from "./use-custom-option-input";
import {
  mockGetField,
  MockGoogleFormComponent,
  submitForm,
} from "../../tests/utils";
import { slugify } from "./slugify";

describe("useCustomOptionInput", () => {
  const mockOptionField: MultipleChoiceField = {
    id: "id",
    label: "Multiple Choice Answer Queston",
    type: "MULTIPLE_CHOICE",
    required: false,
    options: [
      {
        label: "Option 1",
      },
      {
        label: "Option 2",
      },
      {
        label: "Option 3",
      },
      {
        label: "Option 4",
      },
    ],
    hasCustomOption: false,
  };
  const options = mockOptionField.options;
  const firstLabel = options[0].label;
  const lastLabel = options[options.length - 1].label;
  const customOptionLabel = "Custom option";

  let output = {};

  const onSubmit = (data: object) => {
    output = data;
  };

  const CustomOptionInputComponent = ({
    options: registerOptions,
    customInputOptions,
    type = "MULTIPLE_CHOICE",
  }: {
    options?: RegisterOptions;
    customInputOptions?: RegisterOptions;
    type?: "CHECKBOXES" | "MULTIPLE_CHOICE";
  }) => {
    const { customOption, options, error } = useCustomOptionInput(
      mockOptionField.id
    );

    const inputType = type === "MULTIPLE_CHOICE" ? "radio" : "checkbox";

    return (
      <>
        {options.map((o) => (
          <React.Fragment key={o.id}>
            <input
              type={inputType}
              id={o.id}
              {...o.register(registerOptions)}
            />
            <label htmlFor={o.id}>{o.label}</label>
          </React.Fragment>
        ))}
        {customOption && (
          <>
            <input
              type={inputType}
              id={customOption.id}
              {...customOption.register(registerOptions)}
            />
            <label htmlFor={customOption.id}>{customOptionLabel}</label>
            <input
              type="text"
              {...customOption.registerCustomOptionInput(customInputOptions)}
            />
            {customOption.error && (
              <span>
                <>
                  {customOptionLabel} error {customOption.error.type}
                </>
              </span>
            )}
          </>
        )}
        {error && (
          <span>
            <>Error {error.type}</>
          </span>
        )}
      </>
    );
  };

  const renderComponent = ({
    options,
    customInputOptions,
    type,
  }: {
    options?: RegisterOptions;
    customInputOptions?: RegisterOptions;
    type?: "CHECKBOXES" | "MULTIPLE_CHOICE";
  } = {}) =>
    render(
      <MockGoogleFormComponent onSubmit={onSubmit}>
        <CustomOptionInputComponent
          options={options}
          type={type}
          customInputOptions={customInputOptions}
        ></CustomOptionInputComponent>
      </MockGoogleFormComponent>
    );

  const clickOption = async (label: string) => {
    await act(async () => {
      fireEvent.click(screen.getByLabelText(label));
    });
  };

  const fillCustomOption = async (value: string) => {
    await act(async () => {
      fireEvent.change(screen.getByRole("textbox"), {
        target: { value: value },
      });
    });
  };

  beforeEach(() => {
    mockGetField.mockImplementation(() => mockOptionField);
  });

  afterEach(() => {
    output = {};
  });

  it("returns the correspondent field information", () => {
    const { result } = renderHook(
      () => useCustomOptionInput(mockOptionField.id),
      {
        wrapper: MockGoogleFormComponent,
      }
    );

    expect(result.current).toMatchObject(mockOptionField);
  });

  it("builds the options ids correctly", () => {
    const { result } = renderHook(
      () => useCustomOptionInput(mockOptionField.id),
      {
        wrapper: MockGoogleFormComponent,
      }
    );

    result.current.options.forEach((o) =>
      expect(o.id).toBe(`${result.current.id}-${slugify(o.label)}`)
    );
  });

  it("registers the field correctly", async () => {
    renderComponent();

    await clickOption(firstLabel);

    await submitForm();

    expect(output).toEqual({
      [mockOptionField.id]: firstLabel,
    });
  });

  describe("when the field type is MULTIPLE_CHOICE", () => {
    it("changes between options correctly", async () => {
      renderComponent();
      await clickOption(firstLabel);
      await submitForm();

      expect(output).toEqual({
        [mockOptionField.id]: firstLabel,
      });

      await clickOption(lastLabel);
      await submitForm();

      expect(output).toEqual({
        [mockOptionField.id]: lastLabel,
      });
    });
  });

  describe("when the field type is CHECKBOXES", () => {
    const mockCheckboxField: CheckboxesField = {
      ...mockOptionField,
      label: "Checkbox Answer Queston",
      type: "CHECKBOXES",
    };

    beforeEach(() => {
      mockGetField.mockClear();
      mockGetField.mockImplementation(() => mockCheckboxField);
    });

    it("selects the options correctly", async () => {
      renderComponent({ type: "CHECKBOXES" });
      await clickOption(firstLabel);
      await submitForm();

      expect(output).toEqual({
        [mockOptionField.id]: [firstLabel],
      });

      await clickOption(lastLabel);
      await submitForm();

      expect(output).toEqual({
        [mockOptionField.id]: [firstLabel, lastLabel],
      });

      await clickOption(lastLabel);
      await submitForm();

      expect(output).toEqual({
        [mockOptionField.id]: [firstLabel],
      });
    });
  });

  describe("when the field is required", () => {
    const requiredMockField = {
      ...mockOptionField,
      required: true,
    };

    beforeEach(() => {
      mockGetField.mockClear();
      mockGetField.mockImplementation(() => requiredMockField);
    });

    it("gives an error when no option is selected", async () => {
      renderComponent();

      await submitForm();

      expect(screen.getByText("Error required")).toBeVisible();
    });
  });

  describe("when other validations are passed to the register method", () => {
    it("submits the form successfully when it does comply with the validation", async () => {
      renderComponent({
        options: { validate: (value) => value === lastLabel },
      });

      await clickOption(lastLabel);

      await submitForm();

      expect(output).toEqual({
        [mockOptionField.id]: lastLabel,
      });
    });

    it("gives a validation error when it does not comply with the validation", async () => {
      renderComponent({
        options: { validate: (value) => value === lastLabel },
      });

      await clickOption(firstLabel);

      await submitForm();

      expect(screen.getByText("Error validate")).toBeVisible();
    });
  });

  describe("when the field has a custom option", () => {
    const mockCustomOptionField: MultipleChoiceField = {
      ...mockOptionField,
      hasCustomOption: true,
    };

    describe("when the field type is MULTIPLE_CHOICE", () => {
      beforeEach(() => {
        mockGetField.mockClear();
        mockGetField.mockImplementation(() => mockCustomOptionField);
      });

      it("registers the custom option correctly", async () => {
        renderComponent();

        await clickOption(customOptionLabel);

        await submitForm();

        expect(output).toEqual({
          [mockOptionField.id]: OTHER_OPTION_RESPONSE,
          [buildCustomFieldId(mockOptionField.id)]: "",
        });
      });

      it("changes between options correctly", async () => {
        renderComponent();

        await clickOption(customOptionLabel);
        await submitForm();

        expect(output).toEqual({
          [mockOptionField.id]: OTHER_OPTION_RESPONSE,
          [buildCustomFieldId(mockOptionField.id)]: "",
        });

        await clickOption(firstLabel);
        await submitForm();

        expect(output).toEqual({
          [mockOptionField.id]: firstLabel,
          [buildCustomFieldId(mockOptionField.id)]: "",
        });
      });

      describe("when the field is required", () => {
        const mockCustomOptionRequiredField: MultipleChoiceField = {
          ...mockCustomOptionField,
          required: true,
        };

        beforeEach(() => {
          mockGetField.mockClear();
          mockGetField.mockImplementation(() => mockCustomOptionRequiredField);
        });

        describe("when no option is selected", () => {
          it("gives an error on the field", async () => {
            renderComponent();

            await submitForm();

            expect(screen.getByText("Error required")).toBeVisible();
          });

          it("gives no error on the option field", async () => {
            renderComponent();

            await submitForm();

            expect(
              screen.queryByText(`${customOptionLabel} error required`)
            ).not.toBeInTheDocument();
          });
        });

        describe("when the custom option is selected and not filled", () => {
          it("gives no error on the field", async () => {
            renderComponent();

            await clickOption(customOptionLabel);

            await submitForm();

            expect(
              screen.queryByText("Error required")
            ).not.toBeInTheDocument();
          });

          it("gives no error on the option field", async () => {
            renderComponent();

            await clickOption(customOptionLabel);

            await submitForm();

            expect(
              screen.getByText(`${customOptionLabel} error required`)
            ).toBeVisible();
          });
        });

        describe("when the custom option is selected and filled", () => {
          it("gives no error on the option field", async () => {
            renderComponent();

            await clickOption(customOptionLabel);
            await fillCustomOption("xico");

            await submitForm();

            expect(output).toEqual({
              [mockOptionField.id]: OTHER_OPTION_RESPONSE,
              [buildCustomFieldId(mockOptionField.id)]: "xico",
            });
          });
        });
      });
    });

    describe("when the field type is CHECKBOXES", () => {
      const mockCheckboxCustomOptionField: CheckboxesField = {
        ...mockCustomOptionField,
        type: "CHECKBOXES",
      };

      beforeEach(() => {
        mockGetField.mockClear();
        mockGetField.mockImplementation(() => mockCheckboxCustomOptionField);
      });

      it("registers the custom option correctly", async () => {
        renderComponent({ type: "CHECKBOXES" });

        await clickOption(customOptionLabel);

        await submitForm();

        expect(output).toEqual({
          [mockOptionField.id]: [OTHER_OPTION_RESPONSE],
          [buildCustomFieldId(mockOptionField.id)]: "",
        });
      });

      it("selects the options correctly", async () => {
        renderComponent({ type: "CHECKBOXES" });

        await clickOption(customOptionLabel);
        await submitForm();

        expect(output).toEqual({
          [mockOptionField.id]: [OTHER_OPTION_RESPONSE],
          [buildCustomFieldId(mockOptionField.id)]: "",
        });

        await clickOption(firstLabel);
        await submitForm();

        expect(output).toEqual({
          [mockOptionField.id]: [firstLabel, OTHER_OPTION_RESPONSE],
          [buildCustomFieldId(mockOptionField.id)]: "",
        });
      });

      describe("when the field is required", () => {
        const mockCheckboxCustomRequiredField: CheckboxesField = {
          ...mockCheckboxCustomOptionField,
          required: true,
        };

        beforeEach(() => {
          mockGetField.mockClear();
          mockGetField.mockImplementation(
            () => mockCheckboxCustomRequiredField
          );
        });

        describe("when no option is selected", () => {
          it("gives an error on the field", async () => {
            renderComponent({ type: "CHECKBOXES" });

            await submitForm();

            expect(screen.getByText("Error required")).toBeVisible();
          });

          it("gives no error on the option field", async () => {
            renderComponent({ type: "CHECKBOXES" });

            await submitForm();

            expect(
              screen.queryByText(`${customOptionLabel} error required`)
            ).not.toBeInTheDocument();
          });
        });

        describe("when the custom option is selected and not filled", () => {
          it("gives no error on the field", async () => {
            renderComponent({ type: "CHECKBOXES" });

            await clickOption(customOptionLabel);

            await submitForm();

            expect(
              screen.queryByText("Error required")
            ).not.toBeInTheDocument();
          });

          it("gives no error on the option field", async () => {
            renderComponent({ type: "CHECKBOXES" });

            await clickOption(customOptionLabel);

            await submitForm();

            expect(
              screen.getByText(`${customOptionLabel} error required`)
            ).toBeVisible();
          });
        });

        describe("when the custom option is selected and filled", () => {
          it("gives no error on the option field", async () => {
            renderComponent({ type: "CHECKBOXES" });

            await clickOption(customOptionLabel);
            await fillCustomOption("xico");

            await submitForm();

            expect(output).toEqual({
              [mockOptionField.id]: [OTHER_OPTION_RESPONSE],
              [buildCustomFieldId(mockOptionField.id)]: "xico",
            });
          });
        });
      });
    });
  });
});
