import Vue from 'vue'
import App from './App.vue'
import {Button} from 'mint-ui'

import router from './router'
import Header from './components/Header/Header.vue'
import Star from './components/Star/Star.vue'
import CartControl from './components/CartControl/CartControl.vue'
import Split from './components/Split/Split.vue'
import store from './store'
import  './validate'
import './mock/mock-server'
import './filters'

// 注册全局组件
Vue.component('Header', Header)
Vue.component('Star', Star)
Vue.component('CartControl', CartControl)
Vue.component('Split', Split)
Vue.component(Button.name, Button)   //mt-button

/*
在Vue原型对象添加一个事件总线对象(就是一个vm)

  子组件向父组件通信
      <Child @eventName='cb'>
      this.$emit('eventName', data)

  任意关系组件间通信(也可以用pubsub):
      $eventBus.$on('eventName', cb)
      $eventBus.$emit('eventName', data)
 */
Vue.prototype.$eventBus = new Vue()

new Vue({
  el: '#app',  // el元素会被<App/>
  /*components: {
    App
  },
  template: '<App/>'*/

  render: h => h(App),
  /*render: function (createElement) {
    return createElement(App)  // 返回<App/>
  }*/
  router, // 配置路由器
  store, // 配置vuex的store
})