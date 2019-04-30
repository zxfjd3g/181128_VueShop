/*
使用数组来实现队列结构类型
enqueue(element): 向队列尾部添加一个（或是多个）元素。
dequeue(): 移除队列的第一个元素，并返回被移除的元素。
front(): 返回队列的第一个元素——最先被添加的也是最先被移除的元素。队列不做任何变动。
size(): 返回队列的长度。
isEmpty(): 检查队列内是否有元素，如果有返回true，没有返回false
clear(): 清除队列里的元素
 */
(function (window) {

  // 内部包含的数组
  let arr = []

  function Queue() {

  }

  // enqueue(element): 向队列尾部添加一个（或是多个）元素。
  Queue.prototype.enqueue = function (element) {
    arr.push(element)
  }

  // dequeue(): 移除队列的第一个元素，并返回被移除的元素。
  Queue.prototype.dequeue = function () {
    return arr.shift()
  }
  // front(): 返回队列的第一个元素——最先被添加的也是最先被移除的元素。队列不做任何变动。
  Queue.prototype.front = function () {
    return arr[0]
  }
  // size(): 返回队列的长度。
  Queue.prototype.size = function () {
    return arr.length
  }
  // isEmpty(): 检查队列内是否有元素，如果有返回true，没有返回false
  Queue.prototype.isEmpty = function () {
    return arr.length===0
  }
  // clear(): 清除队列里的元素
  Queue.prototype.clear = function () {
    arr = []
  }

  window.Queue = Queue
})(window)