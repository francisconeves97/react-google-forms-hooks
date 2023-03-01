import fetch from "isomorphic-unfetch";
import { GoogleForm } from "@gforms-js/types";
import { extractRawFormData } from "./extract-raw-form-data";
import { parseRawFormData } from "./parse-raw-form-data";

const googleFormsHosts = ["docs.google.com", "forms.gle"];

const assertValidUrl = (formUrl: string): void => {
  const url = new URL(formUrl);

  if (!googleFormsHosts.includes(url.host)) {
    throw new Error(
      `Invalid Google Forms host. ${
        url.host
      } is expected to one of ${googleFormsHosts.join(", ")}`
    );
  }

  if (url.host === googleFormsHosts[0] && !url.pathname.endsWith("/viewform")) {
    throw new Error(`Please use the Google Forms public URL.`);
  }
};

const getFormHtml = async (formUrl: string) => {
  const response = await fetch(formUrl);
  const html = await response.text();
  return html;
};

interface ParseGoogleForm {
  (formUrl: string): Promise<GoogleForm>;
}

const parseGoogleForm: ParseGoogleForm = async (formUrl) => {
  assertValidUrl(formUrl);

  try {
    const html = await getFormHtml(formUrl);

    const rawFormData = extractRawFormData(html);

    return parseRawFormData(rawFormData);
  } catch (err) {
    throw new Error(`Failed to fetch Google Forms form. ${err}`);
  }
};

export { parseGoogleForm };
