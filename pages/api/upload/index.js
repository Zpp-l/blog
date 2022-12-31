// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import fs from "fs";
import formidable from "formidable";
import path from "path";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  const { method } = req;
  let content = undefined;
  if (method === "POST") {
    const form = new formidable.IncomingForm();
    const data = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        resolve({ fields, files });
      });
    });
    // const contents = await fs.readFile(data.files, {
    //   encoding: "utf-8",
    // });

    const sec_data = data.files.file;
    const oldPath = sec_data.filepath;
    const readStream = fs.createReadStream(oldPath);

    const newPath = path.join(
      process.cwd(),
      `posts/${sec_data.originalFilename}`
    );
    const writeStream = fs.createWriteStream(newPath);

    readStream.pipe(writeStream);
    readStream.on("end", function () {
      fs.unlinkSync(oldPath);

      content = fs.readFileSync(newPath, { encoding: "utf-8" });
      console.log('====================================');
      console.log(content);
      console.log('====================================');
      return res.status(200).json({ data: content });
    });

    // const content = fs.readFileSync(newPath,{encoding:'utf-8'});
  }
}
