import { load } from "cheerio";
import { RawFormData, RawFormDataTuple } from "./types";

interface ExtractRawFormData {
  (html: string): RawFormData;
}

const extractRawFormData: ExtractRawFormData = (html) => {
  const $ = load(html);
  const fbzx = $('[name="fbzx"]').attr("value");

  if (!fbzx) {
    throw new Error("Invalid form. Couldn't find fbzx field.");
  }

  const scriptStringIdentifier = "var FB_PUBLIC_LOAD_DATA_ =";

  let scriptHtml = $("script")
    .filter((_, el) => {
      return $(el).html()!.includes(scriptStringIdentifier);
    })
    .first()
    .html();

  if (!scriptHtml) {
    throw new Error("Invalid form. Couldn't find script tag with form data.");
  }

  scriptHtml = scriptHtml.slice(0, -1); // remove ; character
  scriptHtml = scriptHtml.replace(scriptStringIdentifier, ""); // remove var definition

  const rawFormDataTuple: RawFormDataTuple = JSON.parse(scriptHtml);

  return { rawFormDataTuple, fbzx };
};

export { extractRawFormData };
