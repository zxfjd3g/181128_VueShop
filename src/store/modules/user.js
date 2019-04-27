/*
用户模块
 */

import {
  RECEIVE_USER,
  RESET_USER,
} from '../mutation-types'

import {
  reqUser,
  reqLogout
} from '../../api'

const state = {
  user: {}, // 登陆用户信息对象
}

const mutations = {
  [RECEIVE_USER] (state, user) {
    state.user = user
  },
  [RESET_USER] (state) {
    state.user = {}
  },
}

const actions = {
  /*
   获取当前用户的异步action
    */
  async getUser ({commit}) {
    const result = await reqUser()
    if(result.code===0) {
      const user = result.data
      commit(RECEIVE_USER, user)
    }
  },

  /*
  退出登陆的异步action
   */
  async logout ({commit}) {
    const result = await reqLogout()
    if(result.code===0) {
      commit(RESET_USER)
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