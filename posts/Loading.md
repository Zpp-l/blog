## 组件形式

**teleport**  vue3新出的神器

```js
setup(props) {  
  const node = document.createElement('div')  
  node.id = 'back'  
  document.body.appendChild(node)  
  
  setTimeout(()=>{  
    document.body.removeChild(node)  
  },props.timeout)  
  
  onUnmounted(() => {  
    document.body.removeChild(node)  
  })}
```

- 总体来看是创建一个根节点，添加到body上，时间过后移除
- 样式遮罩层

```css
.loading-container{
	background: rgba(255,255,255,.5);
	z-index: 100;
	position: fixed;
	top: 0;
	left: 0;
}
```

**useDOMCreate** hook

```js
function useDOMCreate(nodeId: string) {  
  const node = document.createElement('div')  
  node.id = nodeId  
  document.body.appendChild(node)  
  onUnmounted(() => {  
    document.body.removeChild(node)  
  })}
```

//TODO: 待补充...
