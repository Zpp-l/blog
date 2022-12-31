// 此页面用于上传文件
import dynamic from 'next/dynamic'
import { Upload, message, Button, Form, Input } from "antd";
import {DatePicker} from "antd";
// const DatePicker = dynamic(()=> import('antd/es'))
import PostNative from "../components/posts/post-detail/post-native";
import { useState } from "react";
const UploadPage = () => {
  const [isUpload, setIsUpload] = useState(false);
  const [mdProps, setMdProps] = useState({});
  const [form] = Form.useForm();

  const { Dragger } = Upload;
  const uploadProps = {
    accept: ".md, .pdf",
    name: "file", // 发到后台的文件参数名
    action: "/api/upload",
    multiple: false,
    onChange(info) {
      const { status } = info.file;
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
        setMdProps({
          filename: info.file.name,
          ...info.file.originFileObj,
          content: info.file.response.data,
        });
        setIsUpload(true);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  function handleContentChange(val, type) {
    const value = val.currentTarget.value;
    if (type === "title") {
      setMdProps({ ...mdProps, title: value });
    } else if (type === "excerpt") {
      setMdProps({ ...mdProps, excerpt: value });
    } else if (type === "image") {
      setMdProps({ ...mdProps, image: value });
    } else if (type === "content") {
      setMdProps({ ...mdProps, content: value });
    }
  }

  function DatePickerHandler(date, dateString) {
    setMdProps({ ...mdProps, createTime: dateString });
  }

  function onSubmitHandler() {
    fetch(`/api/upload/update`, {
      method: "POST",
      body: JSON.stringify(mdProps),
    })
      .then((resp) => resp.json())
      .then((data) => {});
  }

  if (!isUpload) {
    return (
      <main className="w-[100%] h-[80vh] flex justify-center items-center">
        <Dragger className="w-[80%] h-60" {...uploadProps}>
          <p className="text-lg">Click or Drag File</p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload.
          </p>
        </Dragger>
      </main>
    );
  } else {
    //     ---
    // title: Mastering JavaScript
    // excerpt: JavaScript is the most important programming language for web development. You probably don't know it well enough!
    // image: mastering-js-thumb.png
    // isFeatured: false
    // date: '2021-10-30'
    // ---
    return (
      <>
        <header className=" flex justify-center items-center my-16">
          <Form layout="inline" form={form}>
            <Form.Item label="标题">
              <Input
                onChange={(e) => {
                  handleContentChange(e, "title");
                }}
                placeholder="输入标题"
              />
            </Form.Item>
            <Form.Item label="简介">
              <Input
                onChange={(e) => {
                  handleContentChange(e, "excerpt");
                }}
                placeholder="输入简介"
              />
            </Form.Item>
            <Form.Item label="头图">
              <Input
                onChange={(e) => {
                  handleContentChange(e, "image");
                }}
                placeholder="输入标题图"
              />
            </Form.Item>
            <Form.Item label="日期">
              <DatePicker
                onChange={DatePickerHandler}
                showNow
                placeholder="输入发布日期"
              />
            </Form.Item>
            <Form.Item>
              <Button onClick={onSubmitHandler}>确认发布</Button>
            </Form.Item>
          </Form>
        </header>
        <main>
          <PostNative
            handleContentChange={handleContentChange}
            content={mdProps.content}
          />
        </main>
      </>
    );
  }
};

export default UploadPage;
