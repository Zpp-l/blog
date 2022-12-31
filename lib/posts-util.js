import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import prism from "remark-prism";
import externalLinks from "remark-external-links";

export const postsDirectory = path.join(process.cwd(), "posts");

export function getPostsFiles() {
  return fs.readdirSync(postsDirectory);
}
export function getPostHeader(postIdentifier) {
  const postSlug = postIdentifier.replace(/\.md$/, ""); // removes the file extension
  const filePath = path.join(postsDirectory, `${postSlug}.md`);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  const postData = {
    slug: postSlug,
    ...data,
  };

  return postData;
}
export async function getPostData(postIdentifier) {
  const postSlug = postIdentifier.replace(/\.md$/, ""); // removes the file extension
  const filePath = path.join(postsDirectory, `${postSlug}.md`);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);
  // 使用matter解析markdown元数据和内容

  const postData = {
    slug: postSlug,
    ...data,
    content: await serialize(content, {
      mdxOptions: {
        development: false,
        remarkPlugins: [prism, externalLinks],
      },
    }),
  };


  return postData;
}

export function getAllPosts() {
  const postFiles = getPostsFiles();
  const allPosts = postFiles.map((postFile) => {
    const data = getPostHeader(postFile);
    return data;
  });

  // const sortedPosts = allPosts.sort((postA, postB) =>
  //   postA.date > postB.date ? -1 : 1
  // );

  return allPosts;
}
