import { test, expect, describe } from "vitest";
import { renderHook } from "@testing-library/react";
import { mockGoogleForm } from "../tests/mocks";
import { useGoogleForm } from "./use-google-form";

describe("useGoogleForm", () => {
  test("should return methods from react-hook-form", () => {
    const { result } = renderHook(() =>
      useGoogleForm({ form: mockGoogleForm })
    );

    const { register, watch } = result.current;

    expect(register).toBeDefined();
    expect(watch).toBeDefined();
  });

  test("should return the getField method", () => {
    const { result } = renderHook(() =>
      useGoogleForm({ form: mockGoogleForm })
    );

    const { getField } = result.current;

    expect(getField).toBeDefined();
  });

  describe("getField", () => {
    test("should return the field with the given id", () => {
      const { result } = renderHook(() =>
        useGoogleForm({ form: mockGoogleForm })
      );

      const { getField } = result.current;

      const field = mockGoogleForm.fields[0];
      const returnedField = getField(field.id);

      expect(returnedField).toBe(field);
    });

    describe("when the field with the given id does not exist", () => {
      test("should throw an error", () => {
        const { result } = renderHook(() =>
          useGoogleForm({ form: mockGoogleForm })
        );

        const { getField } = result.current;

        expect(() => getField("non_existing_id")).toThrowError();
      });
    });
  });
});
