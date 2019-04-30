/*
定义一个栈类型的模块
 */
(function (window) {
  let arr = [] // 栈是通过包装数组实现
  function Stack() {

  }

  // push(element): 添加一个或是几个新元素到栈顶
  Stack.prototype.push = function (element) {
    arr.push(element)
  }
  // pop(): 移除栈顶的元素，同时返回被移除元素
  Stack.prototype.pop = function () {
    return arr.pop() // length-1的元素
  }
  // peek(): 返回栈顶的元素，但并不对栈顶的元素做出任何的修改
  Stack.prototype.peek = function () {
    return arr[arr.length-1]
  }
  // size(): 返回栈的元素个数
  Stack.prototype.size = function () {
    return arr.length
  }
  // isEmpty(): 检查栈内是否有元素，如果有返回true，没有返回false
  Stack.prototype.isEmpty = function () {
    return arr.length===0
  }
  // clear(): 清除栈里的元素
  Stack.prototype.clear = function () {
    arr = []
  }

  window.Stack = Stack

})(window)