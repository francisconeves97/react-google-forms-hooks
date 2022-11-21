import { test, expect, describe, beforeEach, vi } from "vitest";
import fs from "fs";
import path from "path";
import fetchMock from "fetch-mock";

import { parseGoogleForm } from "./parse-google-form";
import fetch from "node-fetch";

vi.mock("node-fetch", () => {
  return {
    default: fetchMock.sandbox(),
  };
});

const fetchMockSandbox = fetch as unknown as fetchMock.FetchMockSandbox;

const FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSe5U3qvg8WHs4nkU-e6h2RlAD7fKoCkou6HO2w2-tXYIA_F8g/viewform";
const SHORTENED_FORM_URL = "https://forms.gle/vXSsfKSvpVJc3NMg9";

describe("parseGoogleForm", () => {
  beforeEach(() => {
    fetchMockSandbox.reset();
  });

  describe("form with all field types", () => {
    beforeEach(() => {
      const mockFormHtml = fs.readFileSync(
        path.join(__dirname, "..", "tests", "mocks", "form.html"),
        { encoding: "utf8" }
      );

      fetchMockSandbox.get(FORM_URL, mockFormHtml);
    });

    test("should parse the form correctly", async () => {
      const result = await parseGoogleForm(FORM_URL);
      expect(result).toMatchSnapshot();
    });
  });

  describe("when using a shortened url for the form", () => {
    beforeEach(() => {
      const mockFormHtml = fs.readFileSync(
        path.join(__dirname, "..", "tests", "mocks", "form.html"),
        { encoding: "utf8" }
      );

      fetchMockSandbox.get(SHORTENED_FORM_URL, mockFormHtml);
    });

    test("should parse the form correctly", async () => {
      const result = await parseGoogleForm(SHORTENED_FORM_URL);
      expect(result).toMatchSnapshot();
    });
  });

  describe("when the form has special characters", () => {
    beforeEach(() => {
      const mockFormHtml = fs.readFileSync(
        path.join(
          __dirname,
          "..",
          "tests",
          "mocks",
          "form-with-special-characters.html"
        ),
        { encoding: "utf8" }
      );

      fetchMockSandbox.get(FORM_URL, mockFormHtml);
    });

    test("should parse the form correctly", async () => {
      const result = await parseGoogleForm(FORM_URL);
      expect(result).toMatchSnapshot();
    });
  });

  describe("when the form is not from the correct host", () => {
    const INCORRECT_HOST_FORM = "https://example.com";

    test("throws an error", async () => {
      await expect(parseGoogleForm(INCORRECT_HOST_FORM)).rejects.toThrow();
    });
  });

  describe("when it fails to fetch the page", () => {
    beforeEach(() => {
      fetchMockSandbox.get(FORM_URL, {
        throws: new Error("Error"),
      });
    });

    test("throws an error", async () => {
      await expect(parseGoogleForm(FORM_URL)).rejects.toThrow();
    });
  });

  describe("when the form url doesnt correspond to the public url", () => {
    const PRIVATE_FORM_URL = FORM_URL.replace("/viewform", "");

    test("throws an error", async () => {
      await expect(parseGoogleForm(PRIVATE_FORM_URL)).rejects.toThrow();
    });
  });

  describe("when it can't find the script tag with the form data", () => {
    beforeEach(() => {
      const mockFormHtml = fs.readFileSync(
        path.join(__dirname, "..", "tests", "mocks", "invalid-form.html"),
        { encoding: "utf8" }
      );

      fetchMockSandbox.get(FORM_URL, mockFormHtml);
    });

    test("throws an error", async () => {
      await expect(parseGoogleForm(FORM_URL)).rejects.toThrow();
    });
  });

  describe("when it can't find the fbzx field", () => {
    beforeEach(() => {
      fetchMockSandbox.get(FORM_URL, "incorrect_html");
    });

    test("throws an error", async () => {
      await expect(parseGoogleForm(FORM_URL)).rejects.toThrow();
    });
  });

  describe("when parsing a form with an unsupported field", () => {
    beforeEach(() => {
      const mockFormHtml = fs.readFileSync(
        path.join(
          __dirname,
          "..",
          "tests",
          "mocks",
          "form-with-unsupported-field.html"
        ),
        { encoding: "utf8" }
      );

      fetchMockSandbox.get(FORM_URL, mockFormHtml);
    });

    test("should parse the form correctly", async () => {
      const result = await parseGoogleForm(FORM_URL);
      expect(result).toMatchSnapshot();
    });
  });
});
