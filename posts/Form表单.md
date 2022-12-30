## 基础做法

Form表单组件整体分为外层表单域和表项：`Form` `Form-item`
`Form`负责收集每个Item的校验规则方法，知者通过on/off收集push到form组件的缓存数组中
当失去焦点或者是提交的时候会触发校验规则

### 精彩片段

```js
const validateInput = () => {  
  if (props.rules) {
    const allPassed = props.rules.every(rule => {  
      let passed = true  
      inputRef.message = rule.message  
      switch (rule.type) {  
        case 'required':  
          passed = (inputRef.val.trim() !== '')  
          break  
        case 'email':  
          passed = emailReg.test(inputRef.val)  
          break  
        case 'custom':  
          passed = rule.validator ? rule.validator() : true  
          break        default:  
          break  
      }  
      return passed  
    })  
    inputRef.error = !allPassed  
    return allPassed  
  }  
  return true  
}
```

事实上，整个数据都在inputRef中，err、msg、val分别存储错误状态、信息、值

## listen $attrs

![[Pasted image 20220819163043.png]]
![[Pasted image 20220819163103.png]]
目的是将placeholder放入input中

## Vue3的v-model怎么写

- `props: modelValue`
- `const inputRef = reative({})`
- emit

```js
const inputRef = reactive({
	val:computed({
		get:()=> props.modelValue || ''
		set:val=>{
			context.emit('update:modelValue',val)
		}
	}),
	err:false,
	msg:''
})
```

## 记录

Vue3无法获取组件实例.context里也仅有emit/attrs/expose..
因此,利用事件总线来传递实例的做法,在Vue3是无法实行的(存疑)

## iView做法

[5.实战 1：具有数据校验功能的表单组件——Form - 简书 (jianshu.com)](https://www.jianshu.com/p/356b867efcd0)

> 与ant-design相似,在form表单域处,配置modal,form-item通过传递实例,将自身实例传入数组保存.通过遍历数组,执行实例中的校验方法.

### 重置数据与校验数据

#### `resetFields`

```js
//form.vue
this.refieds.slice().forEach((field)=>{
	field.resetField()
})
//formItem.vue
const inputRef = reative({
	validateStatus = ""
	validateMessage = ""
})
  resetField () {
	inputRef.value= {
	 ...
	}
	form.model[context.prop] = initialValue; // form实例通过provide传入
  },
```

#### `validate`

支持传入回调函数 / promise

```js
// 校验所有form-item里的数据，支持Promise  
async validate(callback) {  
  const result = await this.fields.every(field => {  
    let flag = true  
    field.validate('', errors => {  
      flag = !errors  
    });  
    return flag  
  });  
  if (typeof callback === 'function') {  
    callback(result)  
  }  return result  
}
```

过滤符合要求的规则,如果是总体的,则返回全部

```js

    // 只支持 blur 和 change，所以过滤出符合要求的 rule 规则
    getFilteredRule (trigger) {
      const rules = this.getRules();
      return rules.filter(rule => !rule.trigger || rule.trigger.indexOf(trigger) !== -1);
    },
```

form-item

```js
    /**
     * 校验数据
     * @param trigger 校验类型
     * @param callback 回调函数
     */
    validate(trigger, callback = function () {}) {
      let rules = this.getFilteredRule(trigger);

      if (!rules || rules.length === 0) {
        return true;
      }

      // 设置状态为校验中
      this.validateState = 'validating';

      // 以下为 async-validator 库的调用方法
      let descriptor = {};
      descriptor[this.prop] = rules;

      const validator = new AsyncValidator(descriptor);
      let model = {};

      model[this.prop] = this.fieldValue;

      validator.validate(model, { firstFields: true }, errors => {
        this.validateState = !errors ? 'success' : 'error';
        this.validateMessage = errors ? errors[0].message : '';

        callback(this.validateMessage);
      });
    }, 
```

#### `Input`

需要对blur和change事件进行监听,当发生状态改变的时候,通知formItem

```html

<input type="text" :value="currentValue" @input="handleInput" @blur="handleBlur"/>
```

```js

watch(){
	value (newVal){
		this.currentValue = value
	}
}

handleInput(event){
	const inputVal = event.target.value
	this.$emit('input',inputVal)
	this.dispatch('iFormItem','on-form-change',value)
}

handleBlur(){
	this.dispatch('iFormItem','on-form-blur',this.currentValue)
}
```

### 总结

每个内部的组件都需要监听change和blur事件,意味着一个完善的组件库需要对基础组件进行封装,监听内部的change和blur,在vue2中,通过传递实例,可以在子组件中访问父组件的方法,可以在父组件中调用子组件的方法,这就是利用slot的好处.

### 相关链接

[[广播与派遣]]
[Form组件](https://gitee.com/literpeng/component/blob/master/src/components/iForm.vue)
[async-validator - npm (npmjs.com)](https://www.npmjs.com/package/async-validator)
