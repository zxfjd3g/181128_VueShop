# 1. 相关API/概念
## 1). Promise: 许诺  
    用来创建promise对象的构造函数: function Promise (excutor) {}
    简洁描述: 一个promise对象用于表示一个异步操作的最终状态（完成或失败），以及该异步操作的结果值
    详细描述: Promise 对象是一个代理对象（代理一个值），被代理的值在Promise对象创建时可能是未知的。
        它允许你为异步操作的成功和失败分别绑定相应的处理方法（handlers）。 
        这让异步方法可以像同步方法那样返回值，但并不是立即返回最终执行结果，而是一个能代表未来出现的结果的promise对象
    promise对象的3种状态值
        pending(未决定的): 初始状态，既不是成功，也不是失败状态。
        resolved(完成的): 意味着操作成功完成。  
        rejected(拒绝的): 意味着操作失败。
    promise对象的状态变化(2种)
        pending ==> resolved: 调用resolve()
        pending ==> rejected: 调用reject()
        注意: promise的状态确定后就不可再转换为其它状态
    promise对象内部隐藏的属性
        [[PromiseStatus]]: 内部变量, 存储promise对象当前的状态值
        [[PromiseValue]]: 内部变量, 存储成功后的value或失败后的reason

## 2). excutor: 执行器
    executor是带有 resolve 和 reject 两个参数的函数: (resolve, reject) => {}
    由我们定义, 在new Promise()内部会立即调用 executor 函数

## 3). resolve: 解决
    由Promise函数内部定义, 但由我们调用的函数
    当异步任务成功时, 我们应该调用resolve函数, 并传入需要的value
    resolve函数内部: 同步将promise对象的状态值变为resolved/resolved, 异步调用已经存储的所有onFulfilled回调函数
    
## 4). reject: 拒绝
    由Promise函数内部定义, 但由我们调用的函数
    当异步任务失败/抛出error时, 我们应该调用reject函数, 并传入需要的reason
    reject函数内部: 同步将promise对象的状态值变为rejected, 异步调用已经存储的所有onRejected回调函数
    
## 5). then: 接着
    promise对象的方法: then(onRsolved函数, onRejected函数), 返回值为一个新的promise对象
    作用: 用来指定promise的状态为fulfilled或rejected时的回调函数
    注意: then()方法的返回值为新的promise对象, 这样可以进行.then()的链式调用

## 6). onResolved: 当已解决时
    由then()的第一个参数指定的回调函数: (value) => {}
    当promise的状态为fulfilled时自动调用
    onResolved函数的返回值:
        返回新的promise对象: 
        返回其它或不返回:
        
## 7). onRejected: 当已拒绝时
    由then()的第二个参数或catch()指定的回调函数: (reason) => {}
    当promise的状态为rejected时自动调用
    oonRejected函数的返回值:
        返回新的promise对象: 
        返回其它或不返回:
        
## 8). catch: 捕获
    promise对象的方法: catch(onRejected函数)
    是then()的语法糖方法, 相当于: then(null, onRejected函数)
    
## 9). Promise.resolve()
    手动创建一个已经resolve的promise快捷方法: Promise.resolve(value/promise)
    如果参数是promise, 直接返回promise
    
## 10). Promise.reject()  用得很少
    手动创建一个已经reject的promise快捷方法

## 11). Promise.all([p1, p2, p3])
    用来实现批量执行多个promise的异步操作, 返回一个新的promise: Promise.all([promise1, promise2, ...])
    只有当所有异步操作都fulfilled后, 新promise才会变为fulfilled状态, 只要有一个变为rejected, 新promise直接变为rejected
    面试题: 实现一次发多个请求, 只有都成功后才去做处理?
    
# 2. 自定义Promise
## 1). 整体结构
## 2). Promise函数的实现
## 3). then()/catch()的实现
## 4). resolve()/rejected()的实现
## 5). all()的实现


    
    