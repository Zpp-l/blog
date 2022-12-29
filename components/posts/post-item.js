import Link from "next/link";
import Image from "next/image";
function PostItem({ title, image, excerpt, date, slug }) {
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const imagePath = `/images/posts/${slug}/${image}`;
  const linkPath = `/posts/${slug}`;

  return (
    <li className="shadow-md bg-slate-50 text-center">
      <Link href={linkPath}>
        <div className="w-full max-h-80 overflow-hidden">
          <Image
            className="object-cover"
            src={imagePath}
            alt={title}
            width={300}
            height={200}
          ></Image>
        </div>
        <div className="p-4">
          <h3 className="text-lg text-gray-800 font-semibold">{title}</h3>
          <time className="text-gray-500">{formattedDate}</time>
          <p className="text-stone-800 pt-3 text-left">{excerpt}</p>
        </div>
      </Link>
    </li>
  );
}

export default PostItem
