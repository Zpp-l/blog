## 特点：

1. 可以通过全局调用`this.$Alert()`
2. 通过直接调用组件的形式`<Alert></Alert>`

## 属性

> 通过传入的属性来进行相对应的配置

```js
type : {
	type: String
	validator: (val) => isIn(val,['info','success','warning'])
}
const isIn(val,array){
	return array.indexOf(val >= -1)
}
```

**样式选择**

```js
:class = "[item.type?`alert-${item.type}`:'']"
```

## 功能

`slot` 通过vue组件实例属性判断是否插入slot，由此判断是通过函数调用的形式还是通过组件直接调用

```vue
<span v-if="$slots.default">
<slot></slot>
</span>
```

## 额外

每一个通过函数调用的item都应该有自己的id，便于从数组中移除

```js
const getUuid = () => `alert_${seed++}`
const name = getUuid()
```

# alert.js的秘密

#alert的秘密

> 在整个组件中起到连接main.js的作用

- `​ getMessageInstance()`

1. 保存Instance对象，如果没有对象，调用Alert组件创建的方法
2. 传递配置信息，调用Instance返回的闭包，从而调用组件实例的对应方法
3. 通过export default直接暴露方法，调用的时候`this.$Alert.info()`

```js
import Notification from './notification.js';

let messageInstance; 

function getMessageInstance() {
  messageInstance = messageInstance || Notification.newInstance();
  return messageInstance;
}

function notice({ duration = 1.5, content = '',type='info' }) {
  let instance = getMessageInstance();
  instance.add({
    content,
    duration,
    type
  });

}

export default {
  info(options) {
    return notice(options);
  },
  success(options){
    return notice({type:'success',...options})
  },
  warning(options){
    return notice({type:'warning',...options})
  }
};
```

## notification.js的秘密

#Alert

> 作为中枢，构建实例并且将Alert实例挂载到body上

1. 为Alert组件对象增加创建子类的方法`newInstance`

```js
Alert.newInstance = (properties) =>{
	const props = properties || {}
	const Instance = new Vue({
		data: props,
		render(h){
			return h(Alert,{props})
		}
	})
}
const component = Instance.$mount()
document.body.appendChild(component.$el)
const alert = Instance.$children[0]
return {
	...alert()
}
```

**Vue3新写法**

```js
// 创建实例
const Instance = createApp(Message,{props})
// 挂载节点
const mountNode = document.createElement('div')
document.body.appendChild(mountNode)
Instance.mount(mountNode)

setTimeout(()=>{
	Instance.unmount(mountNode)
	document.body.removeChild(mountNode)
})
```

## 总结

通过函数调用组件的形式，意味着需要自己手动去挂载组件。
`$mount or $el`
`extend or new Vue`
`render`
