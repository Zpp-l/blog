import classes from "./post-content.module.css";
import { Input } from "antd";
const { TextArea } = Input;
export default function PostNative(props) {
  const { content,handleContentChange } = props;
  return (
    <article
      className={
        "max-w-5xl flex justify-center items-center m-auto border-solid border p-4"
      }
    >
      <TextArea
        className="flex-1"
        bordered={false}
        autoSize
        showCount
        defaultValue={content}
        onChange={(e)=>{handleContentChange(e)}}
      />
    </article>
  );
}
