/*
自定义过滤器模块
 */
import Vue from 'vue'
import moment from 'moment'

// 日期格式化过滤器: date-format
Vue.filter('date-format', (value, formatStr) => {
  return moment(value).format(formatStr || 'YYYY-MM-DD HH:mm:ss')
})