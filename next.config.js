// import remarkGfm from "remark-gfm";
/** @type {import('next').NextConfig} */
// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//   enabled: process.env.ANALYZE === 'true'
// })

// module.exports = withBundleAnalyzer

const withAntdLess = require("next-plugin-antd-less");

module.exports = withAntdLess({
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
  },

  // Other Config Here...

  webpack(config) {
    return config;
  },
});
