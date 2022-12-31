import Head from "next/head";
import { getPostData,getPostsFiles } from "../../lib/posts-util";
import PostContent from "../../components/posts/post-detail/post-content";

export default function PostDetailPage(props) {
  return (
    <>
      <Head>
        <title>{props.post.title}</title>
        <meta name="description" content={props.post.excerpt} />
      </Head>
      <PostContent post={props.post} />
    </>
  );
}
// export async function getServerSideProps(context) {
//   const { params } = context;
//   const { slug } = params;
//   const postData = await getPostData(slug);
//   return {
//     props: {
//       post: postData,
//     },
//   };
// }
export async function getStaticProps(context) {
  const { params } = context;
  const { slug } = params;
  const postData = await getPostData(slug);
  return {
    props: {
      post: postData,
    },
  };
}

export function getStaticPaths() {
  const postFilenames = getPostsFiles();
  const slugs = postFilenames.map((fileName) => fileName.replace(/\.md$/, ""));

  return {
    paths: slugs.map((slug) => ({ params: { slug: slug } })),
    fallback: false,
  };
}
