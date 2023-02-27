import { slugify } from "./slugify";

describe("slugify", () => {
  describe("when the word has accents", () => {
    it("should remove the accents", () => {
      expect(slugify("áccêntedWórd")).toBe("accentedword");
    });
  });

  describe("when the word has spaces", () => {
    it("should replace the spaces with dashes", () => {
      expect(slugify("string with   many spaces")).toBe(
        "string-with-many-spaces"
      );
    });
  });

  describe("when the word has underscores", () => {
    it("should not replace the underscores with dashes", () => {
      expect(slugify("string_with_underscores")).toBe(
        "string_with_underscores"
      );
    });
  });

  describe("when the word is in upper case", () => {
    it("should convert to lowercase", () => {
      expect(slugify("UppErCASE")).toBe("uppercase");
    });
  });
});
