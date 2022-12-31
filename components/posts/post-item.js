import Link from "next/link";
import Image from "next/image";
function PostItem({ title, image, excerpt, date, slug }) {
  let formattedDate = undefined;
  if (date) {
    formattedDate = new Date(date).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  let imagePath = undefined;
  if (image.startsWith("http")) {
    imagePath = image;
  } else {
    imagePath = `/images/posts/${slug}/${image}`;
  }
  const linkPath = `/posts/${slug}`;

  return (
    <li className="shadow-md bg-slate-50 text-center">
      <Link href={linkPath}>
        <main>
          <div className="w-full max-h-80 overflow-hidden">
            {image.startsWith("http") ? (
              <Image
                unoptimized
                src={imagePath}
                alt={title}
                className="object-cover"
                width={400}
                height={200}
              ></Image>
            ) : (
              <Image
                className="object-cover"
                src={imagePath}
                alt={title}
                width={300}
                height={200}
              ></Image>
            )}
          </div>
          <div className="p-4">
            <h3 className="text-lg text-gray-800 font-semibold">{title}</h3>
            <time className="text-gray-500">{formattedDate}</time>
            <p className="text-stone-800 pt-3 text-left">{excerpt}</p>
          </div>
        </main>
      </Link>
    </li>
  );
}

export default PostItem;
