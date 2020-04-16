export const state = () => ({
  message: null
})

export const mutations = {
  UPDATE_MESSAGE(state, message) {
    state.message = message
  }
}

export const actions = {
  update({ commit }, message) {
    commit('UPDATE_MESSAGE', message)
  }
}
