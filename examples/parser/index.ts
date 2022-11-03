import { parseGoogleForm, GoogleForm } from "@google-forms-js/parser";

const a: Promise<GoogleForm> = parseGoogleForm("ola");

console.log(a);
