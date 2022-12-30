import Image from "next/image";

import classes from "./post-header.module.css";

function PostHeader(props) {
  const { title, image } = props;
  if (image && image.startsWith("http")) {
    return (
      <header className={classes.header}>
        <h1>{title}</h1>
        {image && (
          <Image unoptimized src={image} alt={title} width={200} height={150} />
        )}
      </header>
    );
  }
  return (
    <header className={classes.header}>
      <h1>{title}</h1>
      {image && <Image src={image} alt={title} width={200} height={150} />}
    </header>
  );
}

export default PostHeader;
