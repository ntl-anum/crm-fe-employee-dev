import { IncomingForm } from "formidable";
import { promises as fs } from "fs";

let mv = require("mv");

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req, res) => {
  try {
    const data = await new Promise((resolve, reject) => {
      const form = new IncomingForm();
      form.parse(req, (err, fields, files) => {
        if (err) return reject(err);
        for (let i = 0; i < fields.fileCount; i++) {
          let fileName = fields["filename" + i];
          let oldPath = files["file" + i].filepath;
          let newPath = `./public/uploads/${fileName}`;
          mv(oldPath, newPath, function (err) {});
        }
        res
          .status(200)
          .json({ status: "SUCCESS", message: "Files uploaded successfully" });
      });
    });
  } catch (error) {
    res
      .status(200)
      .json({ status: "ERROR", message: "Files uploading failed" });
  }
};
