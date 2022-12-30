import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { getPostData } from "../../../lib/posts-util";

const postsDirectory = path.join(process.cwd(), "posts");
export default async function handler(req, res) {
  const { method } = req;

  if (method === "POST") {
    const { filename, content, title, createTime, excerpt, image } = JSON.parse(
      req.body
    );
    const postData = getPostData(filename);

    const filePath = path.join(postsDirectory, `${postData.slug}.md`);

    const fullContent = matter.stringify(content, {
      title,
      image,
      createTime,
      excerpt,
    });
    fs.writeFile(
      filePath,
      fullContent,
      {
        flag: "w",
      },
      (err) => {
        if (err) {
        }
      }
    );
  }
  return res.status(200).json({
    status: "ok",
  });
}
