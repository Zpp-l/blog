### 为什么Vite这么快

* nobundle的思想，ESM。需要的模块通过import导入，实现模块的按需加载
* 一个import语句即代表一个 HTTP 请求
* 分为依赖和源码，依赖是通过ESBuild实现，通过协商缓存获取。源码修改即更新

‍
