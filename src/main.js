import Vue from 'vue'
import App from './App.vue'
import router from './router'

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
  router,
})