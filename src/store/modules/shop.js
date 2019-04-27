/*
商家模块
 */

import {
  RECEIVE_GOODS,
  RECEIVE_RATINGS,
  RECEIVE_INFO
} from '../mutation-types'


const state = {
  goods: [], // 商品列表
  ratings: [], // 商家评价列表
  info: {}, // 商家信息
}

const mutations = {
  [RECEIVE_GOODS] (state, {goods}) {// 接收包含数据的对象
    state.goods = goods
  },
  [RECEIVE_RATINGS] (state, {ratings}) {
    state.ratings = ratings
  },
  [RECEIVE_INFO] (state, {info}) {
    state.info = info
  },
}

const actions = {

}

const getters = {

}

export default {
  state,
  mutations,
  actions,
  getters
}