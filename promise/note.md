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

## 11). Promise.all()
    用来实现批量执行多个promise的异步操作, 返回一个新的promise: Promise.all([promise1, promise2, ...])
    只有当所有异步操作都fulfilled后, 新promise才会变为fulfilled状态, 只要有一个变为rejected, 新promise直接变为rejected
    面试题: 实现一次发多个请求, 只有都成功后才去做处理?
    
# 2. 自定义Promise
## 1). 整体结构
    /*
    自定义Promise
     */
    
    (function (window) {
    
      /*
      Promise构造函数
      excutor: 内部同步执行的函数  (resolve, reject) => {}
       */
      function MyPromise(excutor) {
    
      }
    
      /*
      为promise指定成功/失败的回调函数
      函数的返回值是一个新的promise对象
       */
      MyPromise.prototype.then = function (onResolved, onRejected) {
    
      }
    
      /*
      为promise指定失败的回调函数
      是then(null, onRejected)的语法糖
       */
      MyPromise.prototype.catch = function (onRejected) {
    
      }
    
      /*
      返回一个指定了成功value的promise对象
       */
      MyPromise.resolve = function (value) {
    
      }
    
      /*
      返回一个指定了失败reason的promise对象
       */
      MyPromise.reject = function (reason) {
    
      }
    
      /*
      返回一个新的promise对象, 只有promises中所有promise都产生成功value时, 才最终成功, 只要有一个失败就直接失败
       */
      MyPromise.all = function (promises) {
    
      }
    
      // 暴露构造函数
      window.MyPromise = MyPromise
    })(window)
    
## 2). Promise函数的实现
    function MyPromise(excutor) {
    
      const self = this
      self.status = 'pending' // 状态值, 初始状态为pending, 成功了变为resolved, 失败了变为rejected
      self.data = undefined // 用来保存成功value或失败reason的属性
      self.callbacks = [] // 用来保存所有待调用的包含onResolved和onRejected回调函数的对象的数组
  
      /*
      异步处理成功后应该调用的函数
      value: 将交给onResolve()的成功数据
       */
      function resolve(value) {
        // 立即更新状态, 保存数据
        self.status = 'resolved'
        self.data = value
  
        // 异步调用所有待处理的onResolved成功回调函数
        setTimeout(() => {
          self.callbacks.forEach(obj => {
            obj.onResolved(value)
          })
        })
      }
  
      /*
      异步处理失败后应该调用的函数
      reason: 将交给onRejected()的失败数据
       */
      function reject(reason) {
        // 立即更新状态, 保存数据
        self.status = 'rejected'
        self.data = reason
  
        // 异步调用所有待处理的onRejected回调函数
        setTimeout(() => {
          self.callbacks.forEach(obj => {
            obj.onRejected(value)
          })
        })
      }
  
      try {
        // 立即同步调用excutor()处理
        excutor(resolve, reject)
      } catch (error) { // 如果出了异常, 直接失败
        reject(error)
      }
    }

## 3). then()/catch()的实现
    /*
    为promise指定成功/失败的回调函数
    函数的返回值是一个新的promise对象
     */
    MyPromise.prototype.then = function (onResolved, onRejected) {
      const self = this
      let promise2 // 用来保存内部产生并返回的新的promsie
  
      // 如果成功/失败的回调函数不是function, 指定一个默认实现的函数
      onResolved = typeof onResolved === 'function' ? onResolved : value => value
      onRejected = typeof onRejected === 'function' ? onRejected : reason => {throw reason}
  
      if (self.status === 'resolved') { // 如果当前promise的状态已经是成功(resolved)
        promise2 = new Promise((resolve, reject) => {
          // 异步执行onResolved
          setTimeout(() => {
            try {
              // 用x变量存储onResolved()的返回值,
              const x = onResolved(self.data)
              if (x instanceof MyPromise) {// x可能是新的promise对象
                // 先执行x这个promise, 并将它的data传递能返回的promise
                x.then(resolve, reject)
              } else {// x也可能是其它
                // 将onResolve()的返回值作为返回的promise的成功value
                resolve(x)
              }
            } catch (error) {// 如果过程中出了error, 交其作为返回的promise的失败reason
              reject(error)
            }
          })
        })
      } else if (self.status === 'rejected') { // 如果当前promise的状态已经是失败(rejected)
        promise2 = new Promise((resolve, reject) => {
          // 异步执行onRejected
          setTimeout(() => {
            try {
              // 用x变量存储onRejected()的返回值,
              const x = onRejected(self.data)
              if (x instanceof MyPromise) {// x可能是新的promise对象
                // 先执行x这个promise, 并将它的data传递能返回的promise
                x.then(resolve, reject)
              } else {// x也可能是其它
                // 将onRejected()的返回值作为返回的promise的成功value
                resolve(x)
              }
            } catch (error) {// 如果过程中出了error, 交其作为返回的promise的失败reason
              reject(error)
            }
          })
        })
      } else { // // 如果当前promise的状态还是未确定(pending)
        promise2 = new Promise((resolve, reject) => {
          self.callbacks.push({
            onResolved(value) {
              try {
                // 用x变量存储onResolved()的返回值,
                const x = onResolved(self.data)
                if (x instanceof MyPromise) {// x可能是新的promise对象
                  // 先执行x这个promise, 并将它的data传递能返回的promise
                  x.then(resolve, reject)
                } else {// x也可能是其它
                  // 将onResolve()的返回值作为返回的promise的成功value
                  resolve(x)
                }
              } catch (error) {// 如果过程中出了error, 交其作为返回的promise的失败reason
                reject(error)
              }
            },
  
            onRejected(value) {
              try {
                // 用x变量存储onRejected()的返回值,
                const x = onRejected(self.data)
                if (x instanceof MyPromise) {// x可能是新的promise对象
                  // 先执行x这个promise, 并将它的data传递能返回的promise
                  x.then(resolve, reject)
                } else {// x也可能是其它
                  // 将onRejected()的返回值作为返回的promise的成功value
                  resolve(x)
                }
              } catch (error) {// 如果过程中出了error, 交其作为返回的promise的失败reason
                reject(error)
              }
            }
          })
        })
      }
  
      return promise2
    }
  
    /*
    为promise指定失败的回调函数
    是then(null, onRejected)的语法糖
     */
    MyPromise.prototype.catch = function (onRejected) {
      return this.then(null, onRejected)
    }

## 4). resolve()/rejected()的实现
    /*
    返回一个指定了成功value的promise对象
    value: 一般数据或promise
     */
    MyPromise.resolve = function (value) {
      return new MyPromise((resolve, reject) => {
        if (value instanceof MyPromise) {
          value.then(resolve, reject)
        } else {
          resolve(value)
        }
      })
    }
  
    /*
    返回一个指定了失败reason的promise对象
    reason: 一般数据/error
     */
    MyPromise.reject = function (reason) {
      return new MyPromise((resolve, reject) => {
        reject(reason)
      })
    }

## 5). all()的实现
    /*
    返回一个新的promise对象, 只有promises中所有promise都产生成功value时, 才最终成功, 只要有一个失败就直接失败
     */
    MyPromise.all = function (promises) {
      return new MyPromise((resolve, reject) => {
        let resolvedCount = 0
        const promiseLength = promises.length
        const values = new Array(promiseLength)
        for (let i = 0; i < promiseLength; i++) {
          Promise.resolve(promises[i]).then(
            value => {
              values[i] = value
              resolvedCount++
              if(resolvedCount===promiseLength) {
                resolve(values)
              }
            },
            reason => {
              reject(reason)
            }
          )
        }
      })
    }


    
    