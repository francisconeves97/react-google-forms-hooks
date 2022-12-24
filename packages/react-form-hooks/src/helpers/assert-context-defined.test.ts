import { assertContextDefined } from "./assert-context-defined";

describe("assertContextDefined", () => {
  describe("when the context is defined", () => {
    test("should not throw an error", () => {
      expect(() => assertContextDefined({} as any)).not.toThrow();
    });
  });

  describe("when the context is null", () => {
    test("should throw an error", () => {
      expect(() => assertContextDefined(null)).toThrow();
    });
  });
});
