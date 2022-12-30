## 一般的table结构

- table 定义HTML表格
- thead 定义表头
- tbody 定义表格主体
- tr 定义表格行
- td 定义表格单元格
- th 定义表格单元

```jsx
// src/components/table-render/render.js
// 描述table组件的render规则
export default {
  functional: true,
  props: {
    row: Object,
    column: Object,
    index: Number,
    render: Function
  },
  render: (h, ctx) => {
    const params = {
      row: ctx.props.row,
      column: ctx.props.column,
      index: ctx.props.index
    };

    return ctx.props.render(h, params);
  }
};
```

表格处定义

```html
<table>  
  <thead>  
  <tr>  
    <th v-for="col in columns" :key="col.title">{{ col.title }}</th>  
  </tr>  
  </thead>  
  <tbody>  
  <tr v-for="(row,rowIndex) in data" :key="rowIndex">  
    <td v-for="col in columns" :key="col.title">  
      <template v-if="col && col['render']">  
        <Render :column="col" :index="rowIndex" :render="col.render" :row="row"></Render>  
      </template>  
      <template v-else>  
        {{ row[col.key] }}  
      </template>  
    </td>  
  </tr>  
  </tbody>  
</table>
```

## 总结

本次组件关心使用render函数进行渲染。首先是定义组件的render函数，用于返回h和context，其次是表格组件中根据columns传入的属性，来判断是否使用render函数进行渲染某处。L
