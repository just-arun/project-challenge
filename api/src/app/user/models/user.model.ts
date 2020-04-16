import { ObjectID } from "bson";
import { Schema, model } from "mongoose";

export const UserModel = model(
  "User",
  new Schema(
    {
      email: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
      img: {
        type: String,
        required: true,
      },
      dob: {
        type: Date,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      proneNumber: {
        type: Number,
        required: true,
      },
      blog: [{ type: ObjectID }],
    },
    { timestamps: true }
  )
);

export class User {
  public _id?: string;
  public email?: string;
  public password?: string;
  public img?: string;
  public dob?: string;
  public address?: string;
  public proneNumber?: string;
}
