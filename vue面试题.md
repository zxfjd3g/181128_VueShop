# day01
## 1. 说说MVVM设计模式
## 2. 说说你对计算属性的理解
## 3. 说说回调函数的判断及相关问题
## 4. 说说2种类型的数据容器
## 5. git的6个基本操作
## 6. data中的数组与对象属性不同处理
## 7. 区别computed与method和watch
## 8. 函数的2个角色, 方法与属性, 方法与函数

# day02
## 1. 写出7个指令及其作用
## 2. 写出vue 7个配置选项及其作用
## 3. 说说vue的生命周期
## 4. 说说项目开发中常用的ES6新语法
## 5. 比较函数的call()/apply()/bind()
## 6. babel的插件和预设
## 7. props和v-model

# day03
## 1. 说说vue组件间通信的几种方式
## 2. 组件化编码流程和2个重要问题
## 3. 详细说明如何判断函数中的this
## 4. 关于2个引用变量指向同一个对象的2个问题
## 5. 说说读取表达式a.b的值的查找流程

# day04
## 1. 说说vue项目中如何与后台通信
## 2. 说说你对事件处理机制的理解
## 3. async/await的作用和使用
## 4. GET请求的2种请求参数
## 5. vm对象与组件对象的关系

# day05
## 1. vue-router提供了哪些语法?   1 + 2 + 2
## 2. 说说vue的数据代理
## 3. 区别一般的HTTP请求与AJAX请求
## 4. 说说debug调试
## 5. 内存结构图(原型结构图)
    function Foo () {}
    const fn1 = new Foo()
    const fn2 = new Foo()
    const o1 = {}
    const o2 = new Object()

# day06
## 1. 说说vue模板解析
## 2. 说说数据绑定的理解和基本原理
## 3. Vue实现数据双向绑定的原理
## 4. Vue的MVVM实现结构图


# day07
## 1. vuex的结构图

## 2. Promise面试题
    1). 题1:
        const promise = new Promise((resolve, reject) => { // 同步回调函数
          console.log(1);
          resolve();
          console.log(2);
        })
      
        promise.then(() => {
          console.log(3);
        })
      
        console.log(4);
    
    2). 题2:
        const promise = new Promise((resolve, reject) => {
          resolve('success1');
          reject('error');
          resolve('success2');
        });
      
        promise.then((res) => {
          console.log('then:', res);
        }).catch((err) => {
          console.log('catch:', err);
        })
        
    3). 题3:  promise结果
        Promise.resolve(1)   
          .then(2)
          .then(Promise.resolve(3))
          .then(console.log)
          
    4). 题4:
        const first = () => (new Promise((resolve,reject)=>{
          console.log(3);  // 1
          let p = new Promise((resolve, reject)=>{
            console.log(7);  // 2
            setTimeout(()=>{
              console.log(5);
              resolve(6);
            },0)
            resolve(1);
          });
          resolve(2);
          p.then((arg)=>{
            console.log(arg);
          });
      
        }));
      
        first().then((arg)=>{
          console.log(arg);
        });
        console.log(4);
        
        3 7 4  1 2 5