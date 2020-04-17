import UserService from '~/api/services/user.service'

export const userActions = {
  async getUserData({ commit }) {
    try {
      const { data } = await UserService.getUserDetail()
      commit('UPDATE_USER', data.data)
    } catch (err) {
      Promise.reject(err)
    }
  },
  async logout({ commit }) {
    try {
      await UserService.logout()
      commit('UPDATE_USER', null)
    } catch (err) {
      Promise.reject(err)
    }
  }
}
