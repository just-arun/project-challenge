import { userActions } from './actions/auth'
import { userMutations } from './mutations/auth'

export const state = () => ({
  user: null
})

export const mutations = userMutations
export const actions = userActions
