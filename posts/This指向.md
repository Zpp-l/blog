1. 谁调用指向谁 简单调用指向全局window 对象调用指向对象
2. 通过new生成，this指向生成的对象
3. 箭头函数，没有this。源于上一个作用域的this
4. 显性声明，apply、bind、call

箭头函数[^1]

‍

[^1]: # 箭头函数

    ---

    cards-deck: 面试::知识篇章

    ---

    #箭头函数

    # 函数声明方式

    ## 声明式：

    函数名、参数列表、函数体
        `function name(parameters){}`

    ## 匿名函数，

    省略函数的名称，赋值给一个变量或者对象的属性
        `var example = function(parameters){}`

    ## 箭头函数 #card

    1. `var example = (parameters)=>{}`
    2. 箭头函数不能用作`构造函数`，没有`prototype`属性，`arguments`（!new）
       - 考虑使用剩余参数`...rest`
    3. 箭头函数不会创建自己的`this，它只会从自己的作用域链的上一层继承 this`。
    4. `call/apply/bind`等方法调用箭头函数也无法改变this指向,即第一个参数为null
    5. 箭头函数不支持 new.target[^2]

    ```js

    Object.defineProperty(obj, "b", {
      get: () => {
        console.log(this.a, typeof this.a, this);
        return this.a+10;
       // 代表全局对象 'Window', 因此 'this.a' 返回 'undefined'
      }
    });

    ```
    在标准函数中，this 引用的是把函数当成方法调用的上下文对象（浏览器环境下是全局上下文）

    ```js
    window.color = 'red';
    let o = { color: 'blue' };
    function sayColor() { console.log(this.color); }
    sayColor(); // 'red' 
    o.sayColor = sayColor; 
    o.sayColor(); // 'blue'
    ```
    node环境输出为null..

    ```js
    var prop = 36;
    var o = {
      prop: 37,
      bar1: function () {
        function foo1() {
          return this.prop;
        }
        return foo1;
      },
      bar2: function () {
        var foo2 = () => this.prop;
        return foo2;
      },
    };
    console.log(o.bar1()()); // 36
    console.log(o.bar2()()); //37
    var fn2 = o.bar2;
    console.log(fn2()()); //36
    ```
    sayColor()在全局上下文中被调用，所以this指向window
    指明`o.sayColor()`，this指向o

    函数内写回调函数时，箭头函数中的 this 会保留定义该函数时的上下文(从作用域链中继承)


[^2]: # new.target

    **检测**构造方法或者函数是否是通过new关键字调用的

    ‍
