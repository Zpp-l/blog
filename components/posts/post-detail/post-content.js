// import ReactMarkdown from "react-markdown";
import dynamic from "next/dynamic";
// const remarkGfm = dynamic(() => import("remark-gfm"));
// const ReactMarkdown = dynamic(() => import("react-markdown"));
// const SyntaxHighlighter = dynamic(()=> import('react-syntax-highlighter/dist/esm/styles/prism'))
// import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// import atomDark from "react-syntax-highlighter/dist/cjs/styles/prism";
// const atomDark = dynamic(() => import("react-syntax-highlighter/dist/cjs/styles/prism"));
// import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// import dracula from "react-syntax-highlighter/dist/cjs/styles/hljs";

import PostHeader from "./post-header";
import classes from "./post-content.module.css";
import { MDXRemote } from "next-mdx-remote";
import "prismjs/themes/prism-okaidia.min.css";
export default function PostContent(props) {
  const { post } = props;
  let imagePath = undefined;
  if (post.image.startsWith("http")) {
    imagePath = post.image;
  } else {
    imagePath = `/images/posts/${post.slug}/${post.image}`;
  }

  return (
    <article className={classes.content}>
      <PostHeader title={post.title} image={imagePath} />
      <article className="prose lg:prose-xl">
        <MDXRemote {...post.content} />
      </article>
    </article>
  );
}
