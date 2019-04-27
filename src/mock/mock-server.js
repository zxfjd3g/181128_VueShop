/*
使用mockjs来mock数据接口
 */
import Mock from 'mockjs'
import data from './data.json'  // data是js对象(内部已解析了json)

// 产生mock接口
Mock.mock('/goods', {code: 0, data: data.goods})
Mock.mock('/ratings',  {code: 0, data: data.ratings})
Mock.mock('/info',  {code: 0, data: data.info})

console.log('mock-server') // 后面发对上面3个路径的ajax请求就可以拦截并返回随机生成的json数据

