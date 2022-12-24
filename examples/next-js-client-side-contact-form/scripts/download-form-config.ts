import { parseGoogleForm } from "@google-forms-js/parser";
import fs from "fs";
import path from "path";

const saveJsonToFile = (filename: string, json: any) => {
  const filePath = path.resolve(__dirname, filename);
  fs.writeFile(filePath, JSON.stringify(json), "utf8", function (err) {
    if (err) throw err;
  });
};

const run = async () => {
  const result = await parseGoogleForm(
    "https://docs.google.com/forms/d/e/1FAIpQLScONyWWPwUsI_cHIAccHWLrB9h31Yq482awOl3BkrJ8J9Pg0w/viewform?usp=sf_link"
  );

  saveJsonToFile(path.join(__dirname, "..", "config", "form.json"), result);
};

run();
