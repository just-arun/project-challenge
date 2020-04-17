import { ObjectID } from "bson";
import { Schema } from "mongoose";
import { model } from "mongoose";
export const PostModel = model(
  "Posts",
  new Schema(
    {
      title: {
        type: String,
        required: true,
      },
      body: {
        type: String,
        required: true,
      },
      author: {
        ref: "User",
        type: ObjectID,
        required: true,
      },
      img: {
        type: String,
        required: true,
      },
      comments: [
        {
          ref: "Comments",
          type: ObjectID,
          default: new Array(0),
        },
      ],
    },
    { timestamps: true }
  )
);

export class Post {
  public title!: string
  public body!: string
  public author!: string | ObjectID
  public img!: string
  public comments?: string[]
}
