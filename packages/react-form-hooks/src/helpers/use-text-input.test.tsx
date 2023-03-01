import React from "react";
import { RegisterOptions } from "react-hook-form";
import { renderHook } from "@testing-library/react";
import { render, fireEvent, screen, act } from "@testing-library/react";
import { ShortAnswerField } from "@gforms-js/types";
import { useTextInput } from "./use-text-input";
import {
  createMockGoogleFormWrapper,
  mockGetField,
  MockGoogleFormComponent,
  submitForm,
} from "../../tests/utils";

describe("useTextInput", () => {
  let output = {};

  const mockTextAnswerField: ShortAnswerField = {
    id: "short_answer",
    label: "Short Answer Question",
    type: "SHORT_ANSWER",
    required: false,
  };

  const onSubmit = (data: object) => {
    output = data;
  };

  const ShortAnswerComponent = (props: { options?: RegisterOptions }) => {
    const { register, error } = useTextInput(mockTextAnswerField.id);
    return (
      <>
        <input type="text" {...register(props.options)} />
        {error && (
          <span>
            <>Error {error.type}</>
          </span>
        )}
      </>
    );
  };

  const renderComponent = (options?: RegisterOptions) =>
    render(
      <MockGoogleFormComponent onSubmit={onSubmit}>
        <ShortAnswerComponent options={options}></ShortAnswerComponent>
      </MockGoogleFormComponent>
    );

  const fillTextField = async (value: string) => {
    await act(async () => {
      fireEvent.change(screen.getByRole("textbox"), {
        target: { value: value },
      });
    });
  };

  beforeEach(() => {
    mockGetField.mockImplementation(() => mockTextAnswerField);
  });

  afterEach(() => {
    output = {};
  });

  test("should return the correspondent field information", () => {
    const { result } = renderHook(() => useTextInput(mockTextAnswerField.id), {
      wrapper: createMockGoogleFormWrapper({ onSubmit }),
    });

    expect(result.current).toMatchObject(mockTextAnswerField);
  });

  test("should register the field correctly", async () => {
    renderComponent();

    await fillTextField("xico");

    await submitForm();

    expect(output).toEqual({
      [mockTextAnswerField.id]: "xico",
    });
  });

  describe("when the field is required", () => {
    const requiredMockField = {
      ...mockTextAnswerField,
      required: true,
    };

    beforeEach(() => {
      mockGetField.mockClear();
      mockGetField.mockImplementation(() => requiredMockField);
    });

    test("should give an error when the field is not filled", async () => {
      renderComponent();

      await submitForm();

      expect(screen.getByText("Error required")).toBeVisible();
    });
  });

  describe("when other validations are passed to the register method", () => {
    test("should submit the form successfully when it does comply with the validation", async () => {
      renderComponent({ minLength: 3 });

      await fillTextField("xico");

      await submitForm();

      expect(output).toEqual({
        [mockTextAnswerField.id]: "xico",
      });
    });

    test("should give a validation error when it does not comply with the validation", async () => {
      renderComponent({ minLength: 3 });

      await fillTextField("xi");

      await submitForm();

      expect(screen.getByText("Error minLength")).toBeVisible();
    });
  });
});
