/*
路由器对象模块
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'

Vue.use(VueRouter)

const router = new VueRouter({
  // mode: 'history', // 去除路径中的#
  // 应用中所有路由
  routes
})

const paths = ['/a', '/b'] // 所有需要进行登陆检查的路由path的数组

// 注册全局前置守卫
router.beforeEach((to, from, next) => {
  console.log('global beforeEach()', to, from)

  // 如果请求的路由是/a或/b, 检查用户是否登陆, 如果已登陆, 放行, 否则跳转到登陆界面
  const path = to.path
  if(paths.indexOf(path)>=0) {
    if (Vue.store.state.user.user._id) { // 已登陆
      next()
    } else { // 没有登陆
      next('/login')
    }
  } else { // 如果不是/a或/b, 直接放行
    next()
  }




  // 放行
  next()
})

export default router