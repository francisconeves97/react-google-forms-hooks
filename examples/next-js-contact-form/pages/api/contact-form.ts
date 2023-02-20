import { NextApiHandler } from "next";
import { GoogleForm, submitGoogleForm } from "@google-forms-js/react";
import form from "../../config/form.json";

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).send("");
  }

  const data = JSON.parse(req.body);

  const { success } = await submitGoogleForm(form as GoogleForm, data);

  if (!success) {
    return res.status(500).send("");
  }

  return res.status(200).send("");
};

export default handler;
