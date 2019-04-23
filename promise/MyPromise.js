(function (window) {

  function MyPromise(excutor) {
    const self = this
    self.status = 'pending' // 状态值, 初始为未确定的, 后面可能为resolved或rejected
    self.data = undefined // 用来保存成功的value或失败的reason
    self.callbacks = [] // 用来存储所有包含onResolved和onRejected回调函数方法的对象的数组

    function resolve(value) {
      if (self.status === 'pending') {
        self.status = 'resolved'
        self.data = value
        setTimeout(() => {
          self.callbacks.forEach(item => {
            item.onResolved(value)
          })
        })
      }
    }

    function reject(reason) {
      if (self.status === 'pending') {
        self.status = 'rejected'
        self.data = reason
        setTimeout(() => {
          self.callbacks.forEach(item => {
            item.onRejected(reason)
          })
        })
      }
    }

    try {
      excutor(resolve, reject)
    } catch (error) {
      reject(error)
    }

  }

  MyPromise.prototype.then = function (onResolved, onRejected) {

    const self = this
    let newPromise

    onResolved = typeof onResolved === 'function' ? onResolved : value => value
    onRejected = typeof onRejected === 'function' ? onRejected : reason => {
      throw reason
    }

    if (self.status === 'resolved') {
      newPromise = new Promise(function (resolve, reject) {
        setTimeout(() => {
          try {
            const x = onResolved(self.data)
            if (x instanceof MyPromise) {
              x.then(resolve, reject)
            } else {
              resolve(x)
            }
          } catch (error) {
            reject(error)
          }
        })
      })
    } else if (self.status === 'rejected') {
      newPromise = new Promise(function (resolve, reject) {
        setTimeout(() => {
          try {
            const x = onRejected(self.data)
            if (x instanceof Promise) {
              x.then(resolve, reject)
            } else {
              resolve(x)
            }
          } catch (error) {
            reject(error)
          }
        })
      })
    } else {// pending
      newPromise = new Promise(function (resolve, reject) {
        self.callbacks.push({
          onResolved(value) {
            try {
              const x = onResolved(self.data)
              if (x instanceof Promise) {
                x.then(resolve, reject)
              } else {
                resolve(x)
              }
            } catch (error) {
              reject(error)
            }
          },

          onRejected(reason) {
            try {
              const x = onRejected(self.data)
              if (x instanceof Promise) {
                x.then(resolve, reject)
              } else {
                resolve(x)
              }
            } catch (error) {
              reject(error)
            }
          }
        })
      })
    }

    return newPromise
  }

  MyPromise.prototype.catch = function (onRejected) {
    return this.then(null, onRejected)
  }

  MyPromise.resolve = function (value) {
    return new MyPromise((resolve, reject) => {
      if (value instanceof MyPromise) {
        value.then(resolve, reject)
      } else {
        resolve(value)
      }
    })
  }

  MyPromise.reject = function (reason) {
    return new MyPromise((resolve, reject) => {
      reject(reason)
    })
  }

  MyPromise.all = function (promises) {
    return new MyPromise((resolve, reject) => {
      let resolvedCount = 0
      const promiseLength = promises.length
      const fullfiledValues = new Array(promiseLength)
      for (let i = 0; i < promiseLength; i++) {
        MyPromise.resolve(promises[i]).then(
          value => {
            resolvedCount++
            fullfiledValues[i] = value
            if (resolvedCount === promiseLength) {
              resolve(fullfiledValues)
            }
          },
          reason => {
            reject(reason)
          }
        )
      }
    })
  }

  window.MyPromise = MyPromise
})(window)
