// import remarkGfm from "remark-gfm";
/** @type {import('next').NextConfig} */

const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
    providerImportSource: "@mdx-js/react",
  },
});
module.exports = withMDX({
  pageExtensions: ["md", "mdx", "js", "jsx"],
});
