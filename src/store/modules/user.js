import utility from 'utility'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    doctorId: '',
    name: '',
    avatar: '',
    introduce: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_DOCTORID: (state, doctorId) => {
    state.doctorId = doctorId
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_INTRODUCE: (state, introduce) => {
    state.introduce = introduce
  }
}

const actions = {
  // user login
  login ({ commit }, userInfo) {
    const { username, password } = userInfo
    const passwordMD5 = utility.md5(password)

    return $api.common.login({ name: username.trim(), password: passwordMD5 }).then(data => {
      commit('SET_TOKEN', data.token)
      setToken(data.token)
    })
  },

  // get user info
  getInfo ({ commit, state }) {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await $api.common.getInfo({ token: state.token })

        if (!data) {
          reject(new Error('Verification failed, please Login again.'))
        }

        const { doctorId, name, avatar, introduce } = data

        commit('SET_DOCTORID', doctorId)
        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        commit('SET_INTRODUCE', introduce)
        resolve(data)
      } catch (error) {
        reject(error)
      }
    })
  },

  // user logout
  logout ({ commit, state }) {
    return new Promise((resolve, reject) => {
      $api.common.logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken ({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
