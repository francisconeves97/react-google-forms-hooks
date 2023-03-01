import { ParagraphField, ShortAnswerField } from "@gforms-js/types";
import { renderHook } from "@testing-library/react";
import { useTextInput } from "./helpers/use-text-input";
import { useParagraphInput } from "./use-paragraph-input";

vi.mock("./helpers/use-text-input");
const mockUseTextInput = vi.mocked(useTextInput);

describe("useParagraphInput", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("when the field type is paragraph", () => {
    const mockField: ParagraphField = {
      type: "PARAGRAPH",
      id: "id",
      label: "mock field",
      required: false,
    };

    beforeEach(() => {
      mockUseTextInput.mockReturnValue(mockField as any);
    });

    it("should return the correspondent field information", () => {
      const { result } = renderHook(() => useParagraphInput(mockField.id));

      expect(result.current).toBe(mockField);
    });
  });

  describe("when the field type is not paragraph", () => {
    const mockField: ShortAnswerField = {
      type: "SHORT_ANSWER",
      id: "id",
      label: "mock field",
      required: false,
    };

    beforeEach(() => {
      mockUseTextInput.mockReturnValue(mockField as any);
    });

    it("should throw an error", () => {
      expect(() => renderHook(() => useParagraphInput(mockField.id))).toThrow();
    });
  });
});
