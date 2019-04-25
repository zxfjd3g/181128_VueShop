/*
自定义Promise构造函数模块
 */
(function (window) {
  /*
  Promise构造函数
  excutor: 同步执行回调函数: (resolve, reject) => {}
   */
  function Promise(excutor) {
    console.log('Promise()', this)
    const self = this

    // 1. 初始化属性
    self.status = 'pending' // 状态属性, 初始值为pending, 后面会改变为: resolved/rejected
    self.data = undefined // 用来保存将来产生了成功数据(value)或/失败数据(reason)
    self.callbacks = [] // 用来存储包含待处理onResolved和onRejected回调函数方法的对象的数组

    // 2. 定义resolve和reject两个函数
    /*
    当异步处理成功后应该立即执行的函数
    value: 需要传递给onResolved函数的成功的值
    内部:
      1. 同步修改状态和保存数据
      2. 异步调用成功的回调函数
     */
    function resolve (value) {
      // 1. 同步修改状态和保存数据
      self.status = 'resolved'
      self.data = value
      // 2. 异步调用成功的回调函数
      setTimeout(() => {
        self.callbacks.forEach(obj => {
          obj.onResolved(value)
        })
      })
    }

    /*
    当异步处理失败/异常时后应该立即执行的函数
    reason: 需要传递给onRejected函数的失败的值
    内部:
      1. 同步修改状态和保存数据
      2. 异步调用失败的回调函数
     */
    function reject (reason) {
      // 1. 同步修改状态和保存数据
      self.status = 'rejected'
      self.data = reason
      // 2. 异步调用失败的回调函数
      setTimeout(() => {
        self.callbacks.forEach(obj => {
          obj.onRejected(reason)
        })
      })
    }

    // 3. 执行excutor,并传入定义好的resolve和reject两个函数
    try {
      excutor(resolve, reject)
    } catch (error) { // 如果excutor函数中抛出异常, 当前promise失败
      reject(error)
    }

  }
  
  /*
  指定成功和失败后回调函数
  函数的返回值是一个新的promise
   */
  Promise.prototype.then = function (onResolved, onRejected) {
    
  }

  /*
  方法返回一个Promise，并且处理拒绝的情况。它的行为与调用Promise.prototype.then(undefined, onRejected) 相同
  then()的语法糖
   */
  Promise.prototype.catch = function (onRejected) {
    return this.then(null, onRejected)
  }

  /*
  返回一个以给定值解析后的Promise 对象
  value也可能是一个promise
   */
  Promise.resolve = function (value) {
    
  }

  /*
  返回一个带有拒绝原因reason参数的Promise对象。
   */
  Promise.reject = function (reason) {
    
  }

  /*
    返回一个 Promise 实例
    只有当promises中所有的都成功了, 返回的promise才成功, 只要有一个失败, 返回的promise就失败了
   */
  Promise.all = function (promises) {
    
  }
  
  window.Promise = Promise
  
})(window)