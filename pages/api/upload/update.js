import fs from "fs/promises";
import matter from "gray-matter";
import path from "path";
import { getPostData } from "../../../lib/posts-util";

const postsDirectory = path.join(process.cwd(), "posts");
export default async function handler(req, res) {
  const { method } = req;

  if (method === "POST") {
    const {
      filename,
      content,
      title,
      createTime,
      excerpt,
      image,
      path: oldPath,
    } = JSON.parse(req.body);
    // const postData = getPostData(filename);
    const postSlug = filename.replace(/\.md$/, ""); // removes the file extension
    const filePath = path.join(postsDirectory, `${postSlug}.md`);

    const fullContent = matter.stringify(content, {
      title,
      image,
      createTime,
      excerpt,
    });
    try {
      await fs.writeFile(filePath, fullContent, {
        flag: "w",
      });
      fs.unlink(oldPath)
      return res.status(200).json({
        status: "ok",
      });
    } catch (err) {
      return res.status(403).json({
        status: "error",
        message: err,
      });
    }
  }
}
