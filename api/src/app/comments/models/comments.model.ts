import { ObjectID } from "bson";
import { Schema } from "mongoose";
import { model } from "mongoose";
export const CommentModel = model(
  "Comments",
  new Schema(
    {
      user: {
        ref: "User",
        type: ObjectID,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
      post: {
        ref: 'Posts',
        type: ObjectID,
        required: true
      },
      img: {
        type: String,
      },
    },
    { timestamps: true }
  )
);


export class Comments {
  public user!: string | ObjectID
  public comment!: string
  public img!: string
  public post!: string | ObjectID
}