import Http from '../httpFun'

export default class CommentService {
  static async create(post) {
    return await Http.post('/comment', post, true)
  }

  static async getOne(id) {
    return await Http.get(`/comment/${id}`)
  }
}
