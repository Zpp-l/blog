import { MDXProvider } from "@mdx-js/react";
import Image from "rc-image";
import Introduce from "../README.md";
import Head from "next/head";
export default function Readme(props) {
  const meta = {
    title: "Peng - Developer",
  };
  return (
    <>
      <Head>
        <title>{meta.title}</title>
      </Head>
      <MDXProvider>
        <main
          {...props}
          className="w-full flex justify-center flex-col items-center mb-7"
        >
          <article className="prose  max-w-5xl lg:prose-lg mt-6 mx-5">
            <Introduce />
          </article>
        </main>
      </MDXProvider>
    </>
  );
}
