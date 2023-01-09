import { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useKeyPress } from "ahooks";
export default function Page() {
  const [newTag, addNewTag] = useState([]); // 新增tags
  const [tagList, updateTagList] = useState([]); // 已有tags
  const input = useRef(null);

  function createTagObj(tag) {
    return { tagName: tag, tagId: uuidv4(), quote: 0 };
  }
  function findTagByName(tagName) {
    return tagList.findIndex((item) => item.tagName === tagName);
  }

  function findTagById(tagId) {
    return tagList.findIndex((item) => item.tagId === tagId);
  }

  function addTagHandler() {
    if (input.current.value === "") return;
    const tag = createTagObj(input.current.value);
    const index = findTagByName(tag.tagName);
    if (index === -1) {
      updateTagList([...tagList, tag]);
    }
  }

  function removeTagHandler(tagId) {
    const index = findTagById(tagId);
    const list = tagList
    list.splice(index,1)
    updateTagList([...list])
  }

  useKeyPress(
    "enter",
    (event) => {
      const { value } = event.target;
      if (value === "") return;
      const tag = createTagObj(value);
      const index = findSameTag(value);
      if (index === -1) {
        updateTagList([...tagList, tag]);
      }
    },
    {
      target: input,
    }
  );

  return (
    <>
      <section className="px-4 sm:px-6 py-4 space-y-4 flex flex-col  items-center">
        <header className="flex items-center justify-between w-[50%]">
          <h2 className="text-lg leading-6 font-bold text-black">
            Custom Tags
          </h2>
          <button
            onClick={addTagHandler}
            className="hover:bg-blue-200 hover:text-blue-800 group flex items-center rounded-md bg-[#e0f2fe] text-blue-600 text-sm font-medium px-4 py-2"
          >
            <svg
              className="group-hover:text-light-blue-600 text-light-blue-500 mr-2"
              width="12"
              height="20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6 5a1 1 0 011 1v3h3a1 1 0 110 2H7v3a1 1 0 11-2 0v-3H2a1 1 0 110-2h3V6a1 1 0 011-1z"
              />
            </svg>
            New
          </button>
        </header>
        <form
          className="relative w-[50%]"
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <svg
            width="20"
            height="20"
            fill="currentColor"
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            />
          </svg>
          <input
            ref={input}
            className="focus:border-blue-500 focus:ring-1 focus:ring-light-blue-500 focus:outline-none w-full text-sm text-black placeholder-gray-500 border border-gray-200 rounded-md py-2 pl-10"
            type="text"
            aria-label="Add Tags"
            placeholder="Add Tags"
          />
        </form>
        <main className="w-[50%]">
          <ul className="flex gap-4 items-center  flex-wrap">
            {tagList &&
              tagList.map((tag) => (
                <li key={tag.tagId} className="relative">
                  <div className=" hover:border-orange-300 hover:shadow-xs w-full flex items-center justify-center rounded-lg border-2 border-dashed border-gray-200 text-sm font-medium py-2 px-4">
                    {tag.tagName}
                    <svg
                      onClick={() => removeTagHandler(tag.tagId)}
                      width={12}
                      height={12}
                      fill="currentColor"
                      className="absolute top-1 right-1 cursor-pointer text-gray-600"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 320 512"
                    >
                      <path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z" />
                    </svg>
                  </div>
                </li>
              ))}
          </ul>
        </main>
        <button
          onClick={addTagHandler}
          className="mt-10 hover:bg-blue-200 hover:text-blue-800 rounded-md bg-[#e0f2fe] text-blue-600 text-base font-bold px-8 py-2"
        >
          保存
        </button>
      </section>
    </>
  );
}
