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