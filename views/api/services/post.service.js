import Http from '../httpFun'

export default class PostService {
  static async create(post) {
    return await Http.post('/post', post, true)
  }

  static async getOne(id) {
    return await Http.get(`/post/${id}`)
  }

  static async getAll() {
    return await Http.get(`/post/all`)
  }

  static async getAllMyPost() {
    return await Http.get(`/post/mine`)
  }
}
