---
title: _document文件
image: >-
  https://tse2-mm.cn.bing.net/th/id/OIP-C.-psUf10ZvPx69FpBBHDKkgHaEo?w=290&h=181&c=7&r=0&o=5&dpr=1.5&pid=1.7
createTime: '2023-01-02'
excerpt: 介绍_document.js文件的用处
---
> _document.js 文件帮助布置网页的document

``` js
import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="ch">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
```

**Head**
`import Head from 'next/head'`
``` html
<Head>
	<title></title>
	<meta name="" description="">
</Head>
```
