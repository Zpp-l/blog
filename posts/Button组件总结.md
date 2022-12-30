## 属性

> 通过传入的属性来进行相对应的配置

```js
type : {
	type: String
	validator: (val) => isIn(val,['primary','default','danger','link'])
}
const isIn(val,array){
	return array.indexOf(val >= -1)
}
```

`disabled`

```js
computed:{
	buttonDisabled(){	
		return Object.prototype
			.hasOwnProperty
			.call(this.$options.propsData,'disabled')
	}
}
```

`样式选择`

```js
:class = "[type ?`btn-${type}`:'', size ?`btn-${size}`:'',{
	"disabled":type==='link' && disabled
}]"
```

## 样式

`!default`: 声明默认值,如果有变量的赋值,替换. 引入自己的scss文件,无需修改初始文件

```scss
$btn-font-weight:400 !default;

// 全局mixin
@mixin btton-size($padding-y,$padding-x,$font-size,$border-radius){
	padding:$padding-y $padding-x;
	font-size: $font-size;
	border-radius: $border-radius
}

@include button-size($btn-padding-y, $btn-padding-x, $btn-font-size, $btn-border-radius)
```

## 功能

`slot` 通过vue组件实例属性判断是否插入slot

```vue
<span v-if="$slots.default">
<slot></slot>
</span>
```

## 额外
