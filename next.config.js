
const dynamic = require("next/dynamic");
const withAntdLess = require("next-plugin-antd-less");
const withPlugins = require("next-compose-plugins");
const remarkGfm = dynamic(() => import("remark-gfm"));

const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
  options: {
    // If you use remark-gfm, you'll need to use next.config.mjs
    // as the package is ESM only
    // https://github.com/remarkjs/remark-gfm#install
    remarkPlugins: [remarkGfm],
    rehypePlugins: [],
    providerImportSource: '@mdx-js/react'
    // If you use `MDXProvider`, uncomment the following line.
    // providerImportSource: "@mdx-js/react",
  },
});
// module.exports = withMDX({
//   // Append the default value with md extensions
//   pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
// })

module.exports = withPlugins([
  [
    withMDX,
    {
      pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
    },
  ],
  [
    withAntdLess,
    {
      // modifyVars: { '@primary-color': '#04f' }, // optional
      lessVarsFilePath: "./src/styles/variables.less", // optional
      lessVarsFilePathAppendToEndOfContent: false, // optional
      cssLoaderOptions: {
        // ...
        mode: "local",
        localIdentName: "[hash:base64:8]",
        exportLocalsConvention: "camelCase",
        exportOnlyLocals: false,
        // ...
        getLocalIdent: (context, localIdentName, localName, options) => {
          return "whatever_random_class_name";
        },
      }
    },
  ],
]);
// // module.exports = {
// //   withMDX: withMDX({ pageExtensions: ["mdx"] }),
// //   withAntdLess: withAntdLess({
// //     // modifyVars: { '@primary-color': '#04f' }, // optional
// //     lessVarsFilePath: "./src/styles/variables.less", // optional
// //     lessVarsFilePathAppendToEndOfContent: false, // optional
// //     cssLoaderOptions: {
// //       // ...
// //       mode: "local",
// //       localIdentName: "[hash:base64:8]",
// //       exportLocalsConvention: "camelCase",
// //       exportOnlyLocals: false,
// //       // ...
// //       getLocalIdent: (context, localIdentName, localName, options) => {
// //         return "whatever_random_class_name";
// //       },
// //     },

// //     // Other Config Here...

// //     webpack(config) {
// //       return config;
// //     },
// //   }),
// // };
// // module.exports = {
// //   withAntdLess({
// //     // modifyVars: { '@primary-color': '#04f' }, // optional
// //     lessVarsFilePath: "./src/styles/variables.less", // optional
// //     lessVarsFilePathAppendToEndOfContent: false, // optional
// //     cssLoaderOptions: {
// //       // ...
// //       mode: "local",
// //       localIdentName: "[hash:base64:8]",
// //       exportLocalsConvention: "camelCase",
// //       exportOnlyLocals: false,
// //       // ...
// //       getLocalIdent: (context, localIdentName, localName, options) => {
// //         return "whatever_random_class_name";
// //       },
// //     }),

// //     // Other Config Here...

// //     webpack(config) {
// //       return config;
// //     },
// //   },
// //   withMDX: {
// //     pageExtensions: ["mdx"],
// //   },
// // };
