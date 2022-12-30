当需要上传一个或一些文件时,支持自定义检查,三种状态模板,暴露成功失败事件

涉及的知识点: [[Slot必知必会]] [[Vue.js 组件精讲#自定义事件 event | 事件]]

```js
    <uploader
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      :beforeUpload="commonUploadCheck"
      :uploaded //上传完成后回传的数据，可以供自定义模版使用
      @file-uploaded //成功回调
      @file-uploaded-error //失败回调
    />

```

```ad-note
uploaded: 如果已经上传,直接更新已有内容
beforeUpload: 上传前的校验程序
```

## props

1. action //路由
2. beforeUpload // 校验
   `type CheckFunction = (file:File)=>boolean`
   `type Function as PropType<CheckFunction>`
3. uploaded

   ```js
   	watch(()=>props.uploaded,(newVal)=>{
   		if(newVal){
   			fileStatus.value = 'success'
   			uploadedData.value = newValue
   		}
   	})
   	const fileStatus = 
   		ref<UploadStatus>(props.uploaded?'success':'ready')
   ```

`type UploadStatus = 'ready' | 'loading' | 'success' | 'error'`

## emits

```js
emits:['file-uploaded', 'file-uploaded-error']

function{
	context.emit('file-uploaded')
}
```

事件在这里的意义是保证了代码的健壮性,使用者可以根据回调进行后续操作

**校验程序**

```js
const uploadCheck = (file:File) =>{
	const result = beforeUploadCheck(file, 
	{format:['image/jpeg','image/png'],size:1})
	const { passed, error } = result
	if(error === 'format'){
		this.$message.info()
	}else{
		this.$message.info()
	}
	return passed
}

interface CheckCondition {
	format?:string[],
	size?: number
}
	// Check的核心
const beforeUploadCheck = (file:File,condition:CheckCondition) =>{
	const {format,size} = condition
	const isValidFormat = format? format.includes(file.type):true
	const isValidSize = size? (file.size / 1024 /1024 < size):true

	let error: ErrorType = null
	if(!isValidFormat){
		error = 'format'
	}
	if(!isValidSize){
		error = 'size'
	}
	return {
		passed: isValidFormat && isValidSize,
		error
	}
}

```

合理的运用三元式,让自己的代码变得更加优雅..

## **有意思的地方**

### v-bind

组件上写样式,但是不想传给最上面的包裹层?

```js
 inheritAttrs: false
 <div v-bind="$attrs"></div>
```

这样子就可以传递样式

### button 与 Input之间的调用.`triggerUpload`

上传文件使用Input的`type`:`file`

```js
    <input ref="fileInput" @change="handleFileChange"/>

	const fileInput = ref(null)
	
    const triggerUpload = () => {
      if (fileInput.value) {
        fileInput.value.click()
      }
    }
```

**上传的核心代码**

从本地的input中获取二进制数据,转为FormData
*'Content-Type': 'multipart/form-data'

```js
    const handleFileChange = (e: Event) => {

      const currentTarget = e.target as HTMLInputElement

      if (currentTarget.files) {

        const files = Array.from(currentTarget.files)

        if (props.beforeUpload) {
          const result = props.beforeUpload(files[0])
          if (!result) {
            return
          }
        }

        
        const formData = new FormData()
        formData.append('file', files[0])

        axios.post(props.action, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
	}
}

```

## Slot

```js
      <slot v-if="fileStatus === 'loading'" name="loading">
        <button class="btn btn-primary" disabled>正在上传...</button>
      </slot>

      <slot v-else-if="fileStatus === 'success'" name="uploaded" :uploadedData="uploadedData">
        <button class="btn btn-primary">上传成功</button>
      </slot>

      <slot v-else name="default">
        <button class="btn btn-primary">点击上传</button>
      </slot>
```

```html
<template #uploaded="dataProps">
	<img :src="dataProps.uploadedData.data.url" />
</template>
```

[FormData]([FormData - Web API 接口参考 | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/API/FormData))
	提供表示表单数据的键值对key/value的构造方式,并且可以轻松将数据通过send()发送

* `multipart/form-data`

- GET请求,并且通过`<form>`的形式带有查询参数.传递给[URLSearchParams]([URLSearchParams - Web API 接口参考 | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/API/URLSearchParams))

类似于map的用法:

- FormData.append()
- FormData.delete()
- FormData.set()
- FormData.get()
- FormData.getAll()
- FormData.has()
- FormData.values()
- FormData.keys()
- FormData.entries()
