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
      img: {
        type: String,
      },
    },
    { timestamps: true }
  )
);
