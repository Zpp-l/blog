import classes from "./post-header.module.css";

function PostHeader(props) {
  const { title } = props;
  return (
    <header className={classes.header}>
      <h1>{title}</h1>
    </header>
  );
}

export default PostHeader;
