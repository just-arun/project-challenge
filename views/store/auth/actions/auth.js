import UserService from '~/api/services/user.service'

export const userActions = {
  async getUserData({ commit }, id) {
    try {
      const { data } = await UserService.getUserDetail(id)
      commit('UPDATE_USER', data.data)
    } catch (err) {
      Promise.reject(err)
    }
  }
}
