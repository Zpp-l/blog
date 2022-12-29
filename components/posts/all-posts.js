import PostsGrid from "./posts-grid";

function AllPosts(props) {
//   const title = `font-size: var(--size-8);color:var(--color-grey-800);text-align:center;`;
  return (
    <section className="w-11/12 m-auto ">
      <h1 className="text-4xl text-gray-800 text-center">All Posts</h1>
      <PostsGrid posts={props.posts} />
    </section>
  );
}

export default AllPosts;
