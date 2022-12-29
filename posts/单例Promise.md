一次性懒惰初始化，即每次查询之前，根据需要初始化自身，并且只会执行一次

1. 获取连接
2. 查询数据库


公开`getRecord`方法
```js
    class DbClient{
    	private isConnected: boolean
    	constructor(){
    		this.isConnected = false
    	}

    	private async connect(){
    		if(this.isConnected){
    			return 
    		}
    		await connectToDatabase()
    		this.isConnected = true
    	}

    	public async getRecord(recordId:string){
    		await this.connect()
    		return getRecordXXXX(recordId)
    	}

    }
    ```
这段代码的思路是创建一个实例db，使用getRecord进行查询，如果已经连接，就直接查询但是会出现条件竞争

```js
    const db = new DbClient()
    const [record1, record2] = await Promise.all([db.getRecord('record1'),db.getRecord('record2')])
    ```
但是如果两个请求同时访问，`isConnected`可能还未发生状态改变

引入单例Promise，在这个类中，只维护一个promise

```js
    class DbClient{
    	private isConnected: Promise<void> | null
    	constructor(){
    		this.isConnected = null
    	}

    	private async connect(){
    		if(!this.isConnected){
    			 this.isConnected =  connectToDatabase()
    		}
    		
    		return this.isConnected
    	}

    	public async getRecord(recordId:string){
    		await this.connect()
    		return getRecordXXXX(recordId)
    	}

    }
    ```
- 可以多次等待同样的Promise，即一个`resolve`，另一个自然也是
- 可以等待已经解决的Promise，并且立即解决

**总结**
运用在存在竞争的访问之中，如果不使用Promise，那么就有可能造成多次请求