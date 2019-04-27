/*
外卖首页模块
 */

import {
  RECEIVE_ADDRESS,
  RECEIVE_SHOPS,
  RECEIVE_CATEGORYS,
} from '../mutation-types'

import {
  reqAddress,
  reqCategorys,
  reqShops,
} from '../../api'

const state = {
  latitude: 40.10038, // 纬度
  longitude: 116.36867, // 经度
  address: {}, // 当前地址对象
  categorys: [], // 商品分类数组
  shops: [], // 商家数组
}

const mutations = {
  [RECEIVE_ADDRESS] (state, address) {
    state.address = address
  },
  [RECEIVE_SHOPS] (state, shops) {
    state.shops = shops
  },
  [RECEIVE_CATEGORYS] (state, categorys) {
    state.categorys = categorys
  },
}

const actions = {
  /*
   获取地址的异步action
    */
  async getAddress({commit, state}) {
    const {longitude, latitude} = state
    // 1. 执行异步请求
    const result = await reqAddress(longitude, latitude)
    // 2. 根据结果, 提交mutation
    if (result.code === 0) {
      const address = result.data
      commit(RECEIVE_ADDRESS, address)
    }
  },

  /*
  获取分类列表的异步action
   */
  async getCategorys({commit}) {
    // 1. 执行异步请求
    const result = await reqCategorys()
    // 2. 根据结果, 提交mutation
    if (result.code === 0) {
      const categorys = result.data
      commit(RECEIVE_CATEGORYS, categorys)
    }
  },


  /*
  获取商家列表的异步action
   */
  async getShops({commit, state}) {
    const {longitude, latitude} = state
    // 1. 执行异步请求
    const result = await reqShops({longitude, latitude})
    // 2. 根据结果, 提交mutation
    if (result.code === 0) {
      const shops = result.data
      commit(RECEIVE_SHOPS, shops)
    }
  },
}

const getters = {

}

export default {
  state,
  mutations,
  actions,
  getters
}