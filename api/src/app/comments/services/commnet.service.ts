import { ObjectID } from "bson";
import { Comments, CommentModel } from "./../models/comments.model";
import { UserModel } from "../../user/models/user.model";
import { PostModel } from "../../post/models/post.model";

export default class CommentService {
  public static async create(comment: Comments) {
    return new CommentModel(comment)
      .save()
      .then((res) => {
        const commentId = new ObjectID(res._id);
        return PostModel.findOneAndUpdate(
          { _id: comment.post },
          {
            $push: {
              comments: commentId,
            },
          }
        )
          .then((_) => {
            return UserModel.findOne({_id: comment.user})
            .then((user: any) => {
              let newdata: any = res
              newdata['email'] = user.email
              return newdata
            })
          })
          .catch((err) => Promise.reject(err));
      })
      .catch((err) => Promise.reject(err));
  }
  public static async getOne(id: string) {
    return CommentModel.findOne({ _id: new ObjectID(id) })
      .exec()
      .then((res: any) => {
        const _id = res.user;
        return UserModel.findOne({ _id })
          .exec()
          .then((data: any) => {
            return {
              comment: res.comment,
              img: res.img,
              user: res.user,
              email: data.email,
            };
          })
          .catch((err) => Promise.reject(err));
      })
      .catch((err) => Promise.reject(err));
  }
}
