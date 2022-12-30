import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

import PostHeader from "./post-header";
import classes from "./post-content.module.css";
import Image from "next/image";
import Heading from "./Heading";

export default function PostContent(props) {
  const { post } = props;
  const imagePath = `/images/posts/${post.slug}/${post.image}`;
  const customRenderers = {
    // h1(head) {
    //   const { level, children } = head;
    //   return (
    //     <Heading className="my-5" level={`h${level}`} id={children[0]}>
    //       <a href={`#${children[0]}`}>
    //         <span className="text-6xl">{children}</span>
    //       </a>
    //     </Heading>
    //   );
    // },
    // h2(head) {
    //   const { level, children } = head;
    //   return (
    //     <Heading className="my-4" level={`h${level}`} id={children[0]}>
    //       <a href={`#${children[0]}`}>
    //         <span className="text-5xl">{children}</span>
    //       </a>
    //     </Heading>
    //   );
    // },
    // h3(head) {
    //   const { level, children } = head;
    //   return (
    //     <Heading className="my-3" level={`h${level}`} id={children[0]}>
    //       <a href={`#${children[0]}`}>
    //         <span className="text-4xl">{children}</span>
    //       </a>
    //     </Heading>
    //   );
    // },
    // h4(head) {
    //   const { level, children } = head;
    //   return (
    //     <Heading className="my-2" level={`h${level}`} id={children[0]}>
    //       <a href={`#${children[0]}`}>
    //         <span className="text-3xl">{children}</span>
    //       </a>
    //     </Heading>
    //   );
    // },
    // h5(head) {
    //   const { level, children } = head;
    //   return (
    //     <Heading className="my-1" level={`h${level}`} id={children[0]}>
    //       <a href={`#${children[0]}`}>
    //         <span className="text-2xl">{children}</span>
    //       </a>
    //     </Heading>
    //   );
    // },
    // h6(head) {
    //   const { level, children } = head;
    //   return (
    //     <Heading className="my-0" level={`h${level}`} id={children[0]}>
    //       <a href={`#${children[0]}`}>
    //         <span className="text-xl">{children}</span>
    //       </a>
    //     </Heading>
    //   );
    // },
    // strong(paragraph) {
    //   return (
    //     <p className="mb-1">
    //       <strong>{paragraph.children}</strong>
    //     </p>
    //   );
    // },
    // ul({ children }) {
    //   return (
    //     <ul className="ml-6" style={{ listStyle: "initial" }}>
    //       {children}
    //     </ul>
    //   );
    // },
    // p(paragraph) {
    //   const { node } = paragraph;
    //   if (node.children[0].tagName === "img") {
    //     const image = node.children[0];
    //     return (
    //       <div className={classes.image}>
    //         <Image
    //           src={`/images/posts/${post.slug}/${image.properties.src}`}
    //           alt={image.alt}
    //           width={600}
    //           height={300}
    //         />
    //       </div>
    //     );
    //   }
    //   return <p className="mb-1">{paragraph.children}</p>;
    // },
    code(code) {
      const { inline, className, children } = code;
      const match = /language-(\w+)/.exec(className || ""); // className is something like language-js => We need the "js" part here
      return !inline && match ? (
        <SyntaxHighlighter
          style={atomDark}
          language={match[1]}
          PreTag="div"
          {...props}
        >
          {children}
        </SyntaxHighlighter>
      ) : (
        <code className="text-gray-800 bg-slate-300">{children}</code>
      );
    },
  };

  return (
    <article className={classes.content}>
      <PostHeader title={post.title} image={imagePath} />
      <article className="prose lg:prose-xl">
        <ReactMarkdown components={customRenderers} remarkPlugins={[remarkGfm]}>
          {post.content}
        </ReactMarkdown>
      </article>
    </article>
  );
}
