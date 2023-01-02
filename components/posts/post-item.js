import Link from "next/link";
import Image from "next/image";
function PostItem({ title, image, excerpt, createTime, slug }) {
  let formattedDate = undefined;
  if (createTime) {
    formattedDate = new Date(createTime).toLocaleDateString("en-US", {
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
    <li className="shadow-md bg-slate-50 text-center  hover:shadow-lg">
      <Link href={linkPath}>
        <main>
          <div className="w-full max-h-50 overflow-hidden">
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
                height={150}
              ></Image>
            )}
          </div>
          <div className="p-4">
            <h3 className="text-lg text-gray-800 font-semibold">{title}</h3>
            <time className="text-gray-500">{formattedDate}</time>
            <p className="text-[#555555] pt-3 px-4 text-left text-base">{excerpt}</p>
            {/* <p className="text-sm text-[#555555]">阅读全文 &gt;&gt;</p> */}
          </div>
        </main>
      </Link>
    </li>
  );
}

export default PostItem;
