import Head from "next/head";
import AllPosts from "../../components/posts/all-posts";
import { getAllPosts } from "../../lib/posts-util";
export default function AllPostsPage(props) {
  return (
    <>
      <Head>
        <title>All Posts</title>
        <meta name="description" content="A list of all tutorials and posts" />
      </Head>
      <AllPosts posts={props.posts} />
    </>
  );
}

export async function getStaticProps() {
  const allPosts = getAllPosts();
  console.log(allPosts);
  return {
    props: {
      posts: allPosts,
    },
    revalidate: 60,
  };
}
