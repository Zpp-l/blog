import PostItem from "./post-item";

function PostsGrid(props) {
  const { posts } = props;

  return (
    <ul className="list-none m-0 mt-6 p-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 content-center">
      {posts.map((post) => (
        <PostItem key={post.slug} {...post} />
      ))}
    </ul>
  );
}

export default PostsGrid;
