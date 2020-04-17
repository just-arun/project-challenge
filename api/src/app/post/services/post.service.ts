import { UserModel } from "./../../user/models/user.model";
import { ObjectID } from "bson";
import { Post, PostModel } from "./../models/post.model";

export default class PostService {
  public static async createPost(id: string, post: Post) {
    console.log({ post });
    return new PostModel(post)
      .save()
      .then((res: any) => {
        const userId = res._id;
        return UserModel.updateOne(
          { _id: id },
          {
            $push: {
              blog: userId,
            },
          }
        )
          .then((resData) => {
            console.log({ resData });
            return res;
          })
          .catch((err) => Promise.reject(err));
      })
      .catch((err) => Promise.reject(err));
  }

  public static async getOne(id: string) {
    return PostModel.findOne({ _id: new ObjectID(id) })
      .exec()
      .then((res: any) => {
        return UserModel.findOne({ _id: res.author })
          .then((author: any) => {
            return {
              _id: res._id,
              title: res.title,
              body: res.body,
              author: res.author,
              email: author.email,
              pImg: author.img,
              img: res.img,
              comments: res.comments,
              createdAt: res.createdAt,
              updatedAt: res.updatedAt,
            };
          })
          .catch((err) => Promise.reject(err));
      })
      .catch((err) => Promise.reject(err))
      .finally(() => console.log("getting one post"));
  }

  public static async getAll(id?: string) {
    const matchCon = () => {
      if (id) {
        return { author: id };
      } else {
        return {};
      }
    };
    console.log(matchCon());
    return PostModel.aggregate([
      {
        $match: matchCon(),
      },
      {
        $lookup: {
          from: "users",
          localField: "author",
          foreignField: "_id",
          as: "author",
        },
      },
      {
        $unwind: "$author",
      },
      {
        $group: {
          _id: "$_id",
          title: { $first: "$title" },
          body: { $first: "$body" },
          img: { $first: "$img" },
          createdAt: { $first: "$createdAt" },
          author: { $first: "$author._id" },
          authorEmail: { $first: "$author.email" },
          comments: { $first: "$comments" }
        },
      },
      {
        $sort: {
          createdAt: -1
        }
      }
    ])
      .then((res: any) => {
        let data = res;
        return data;
      })
      .catch((err: any) => {
        console.log(err);
        return Promise.reject(err);
      })
      .finally(() => console.log("getting all posts"));
  }
}
