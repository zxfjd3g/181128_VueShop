import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Header from './components/Header/Header.vue'
import Star from './components/Star/Star.vue'
import store from './store'

// 注册全局组件
Vue.component('Header', Header)
Vue.component('Star', Star)

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