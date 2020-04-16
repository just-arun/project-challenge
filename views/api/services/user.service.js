import Http from '../httpFun'

export default class UserService {
  static async register(data) {
    return await Http.post('/user/register', data, true)
  }
}
