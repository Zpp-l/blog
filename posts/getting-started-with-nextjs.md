---
title: 'Getting Started with NextJS'
date: '2022-10-16'
image: getting-started-nextjs.png
excerpt: NextJS is a the React framework for production - it makes building fullstack React apps and sites a breeze and ships with built-in SSR.
isFeatured: true
---
访问和操作DOM是现代web应用的重要部分，但是每次通过JavaScript连接DOM时，会造成额外的性能损失。因此最小化DOM访问次数，尽可能在JavaScript端处理。

**如何最小化DOM访问次数？**
- 如果需要频繁的访问某个DOM节点，使用局部变量存储DOM的引用

**HTML集合**
实时连系着底层文档，可能会触发某些问题

**遍历DOM**
> 查找某个DOM元素的所有子节点

`childNodes` `nextSibling`
``` js
function testNextSibling() {  
    const el = document.getElementById('mydiv'), ch = el.firstChild  
    let name = []  
    do {  
        name.push(ch.nodeName)  
    } while (ch === ch.nextSibling);  
    return name  
}
```

``` js
function testChildNodes() {  
    const el = document.getElementById('mydiv'), ch = el.childNodes, len = ch.length  
    let name = []  
    for (let count = 0; count < len; count++) {  
        name.push(ch[count].nodeName)  
    }  
    return name  
}
```

*tips* nextSibling获取相邻元素，childNodes获取子节点集合

- 元素节点
意为HTML标签，除去注释和文本节点
// 兔兔

-  选择器API
	- `querySelectorAll()`
	- `querySelector()`
返回的是NodeList-包含匹配节点的类数组对象而非HTML集合。

**重排重绘**
1. 改变DOM节点的几何属性 width、height、padding、margin、border
2. 操作node节点，增加、删除、移动
3. 获取特定属性 offset client 需要实时计算的属性

* 避免逐条改变样式，使用类名去合并样式
* <u>需要</u>​<u>频繁变动的DOM，对于脱离文档流的绝对定位不会引发回流</u>
* 对于特定属性的修改，进行js变量的缓存，最后一次赋值

### 事件委托
利用事件委托减少事件处理器的数量
* 利用事件流捕获、冒泡的特性，为父节点添加事件监听
* 通过`event.target`获得触发的DOM节点, `event.currentTarget`​ 是绑定事件的节点

****