import { test, expect, describe, beforeEach, vi } from "vitest";
import fetchMock from "fetch-mock";

import { submitGoogleForm } from "./submit-google-form";
import fetch from "isomorphic-unfetch";
import { GoogleForm } from "@google-forms-js/types";

vi.mock("isomorphic-unfetch", () => {
  return {
    default: fetchMock.sandbox(),
  };
});

const fetchMockSandbox = fetch as unknown as fetchMock.FetchMockSandbox;

describe("submitGoogleForm", () => {
  const mockForm = {
    formMetadata: {
      action: "e/1234",
    },
  } as GoogleForm;

  const mockFormData = {
    simpleField: "test",
    arrayField: ["test1", "test2"],
  };

  beforeEach(() => {
    fetchMockSandbox.reset();
  });

  describe("when the request is successful", () => {
    beforeEach(() => {
      fetchMockSandbox.get(
        "https://docs.google.com/forms/d/e/1234/formResponse?submit=Submit&entry.simpleField=test&entry.arrayField=test1&entry.arrayField=test2",
        {
          status: 200,
        }
      );
    });

    test("should return the success flag as true", async () => {
      const result = await submitGoogleForm(mockForm, mockFormData);

      expect(result).toEqual({
        success: true,
      });
    });
  });

  describe("when there is an id that is from custom answer", () => {
    const mockFormdata = {
      id1: "id1value",
      id2: "id2value",
      id3: "__other_option__",
      ["id3-other_option_response"]: "id3value",
    };

    beforeEach(() => {
      fetchMockSandbox.get(
        "https://docs.google.com/forms/d/e/1234/formResponse?submit=Submit&entry.id1=id1value&entry.id2=id2value&entry.id3=__other_option__&entry.id3.other_option_response=id3value",
        {
          status: 200,
        }
      );
    });

    test("should return the success flag as true and call the correct url", async () => {
      const result = await submitGoogleForm(mockForm, mockFormdata);

      expect(result).toEqual({
        success: true,
      });
    });
  });

  describe("when the request fails", () => {
    beforeEach(() => {
      fetchMockSandbox.get(
        "https://docs.google.com/forms/d/e/1234/formResponse?submit=Submit&entry.simpleField=test&entry.arrayField=test1&entry.arrayField=test2",
        {
          status: 400,
        }
      );
    });

    test("should return the success flag as false", async () => {
      const result = await submitGoogleForm(mockForm, mockFormData);

      expect(result).toEqual({
        success: false,
      });
    });
  });
});
