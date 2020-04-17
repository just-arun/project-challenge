import Http from '../httpFun'

export default class UserService {
  static async register(data) {
    return await Http.post('/user/register', data, true)
  }

  static async login(data) {
    return await Http.post('/auth/user/login', data)
  }

  static async getUserDetail() {
    return await Http.get(`/user/me`)
  }

  static async logout() {
    return await Http.post('/auth/logout')
  }
}
