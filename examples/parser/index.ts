import { parseGoogleForm } from "@gforms-js/parser";
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
    "https://docs.google.com/forms/d/e/1FAIpQLSf5YK1mmRKPoFCFxNuH0XgyJ4bSRpFk3K5NkS-nlX4VBdysAw/viewform"
  );

  saveJsonToFile("form.json", result);
};

run();
