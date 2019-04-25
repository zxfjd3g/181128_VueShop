/*
自定义PubSub
 */
(function (window) {

  /*
  总控制器对象
   */
  const PubSub = {}

  /*
  订阅消息
  msg: 消息名
  subscriber: 处理消息的回调函数, 也称为订阅者
   */
  PubSub.subscribe = function (msg, subscriber) {

  }

  /*
  异步发布消息(也就是订阅者回调函数是异步处理的)
  msg: 消息名
  data: 需要传递的数据, 会传递给所有匹配的订阅者回调函数
   */
  PubSub.publish = function (msg, data) {

  }

  /*
  同步发布消息(也就是订阅者回调函数是同步处理的)
  msg: 消息名
  data: 需要传递的数据, 会传递给所有匹配的订阅者回调函数
   */
  PubSub.publishSync = function (msg, data) {

  }

  /*
  取消订阅
  flag:
      如果不传取消所有订阅
      消息名: 取消此消息上的所有订阅
      标识名称: 取消对应的某个订阅
   */
  PubSub.unsubscribe = function (flag) {

  }

  window.PubSub = PubSub
})(window)
