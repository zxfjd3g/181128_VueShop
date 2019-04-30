## 1. 相关API
    1). PubSub.subscribe(msg, subscriber): 订阅消息: 指定消息名和订阅者回调函数
    2). PubSub.publish(msg, data): 异步发布消息: 指定消息名和数据
    3). PubSub.publishSync(msg, data): 同步发布消息: 指定消息名和数据
    4). PubSub.unsubscribe(flag): 取消订阅: 根据标识取消某个或某些消息的订阅
## 2. 自定义
    1). 整体结构
    2). 实现订阅与发布
    3). 实现取消订阅