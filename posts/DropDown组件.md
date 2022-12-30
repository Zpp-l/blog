> 仅考虑JS逻辑，不考虑样式

# 组件拆分

![[Pasted image 20220819144522.png]]

- dropdown作为主容器，内有dropdown-item。便于自定义，用户可以自己决定
- dropdown-item内也是使用`slot`，便于自定义

## DropDown

```html
<div class="dropdown" ref="dropdownRef">  
  <a href="#" class="btn btn-outline-light my-2 dropdown-toggle" @click.prevent="toggleOpen">  
    {{ title }}  
  </a>  
  <ul class="dropdown-menu" :style="{display:'block'}" v-if="isOpen">  
    <slot></slot>  
  </ul>  
</div>
```

- `@click.prevent` 阻止标签a的默认事件
- `ul`标签包裹的是以menu形式存在的dropdown-item

**事件**

检测鼠标点击事件
当打开DropDown，点击组件以外的位置，会自动关闭下拉框
原理： 传入组件实例，表示传入的节点是否为该节点的后代节点 `contains`

```js
const useClickOutSide = (elementRef)=> {
	const isClickOutside = ref(false)
	const handler = (e) =>{
		if(elementRef.value){
			isClickOutside = !elementRef.value.contains(e.target)
		}
	}
	onMounted(()=>{
		addEventListener()
	})
	onUnmounted(()=>{
		removeEventListener()
	})
	return useClickOutSide
}
```

## DropDownItem

```html
<li class="dropdown-option" :class="{'is-disabled':disabled}">  
  <slot></slot>  
</li>
```

- 属性添加禁用功能，使用css即可
  - `pointer-events:none`
