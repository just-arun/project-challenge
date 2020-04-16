import { UserModel, User } from "./../models/user.model";
import { ObjectID } from "bson";

export default class UserService {
  public static async create(user: User): Promise<any> {
    return new UserModel(user)
      .save()
      .then((res) => res)
      .catch((err) => Promise.reject(err))
      .finally(() => console.log("create finished"));
  }
  public static async update(id: string, user: User): Promise<any> {
    delete user.password;
    delete user.email;
    const _id = new ObjectID(id);
    return UserModel.findOneAndUpdate({ _id }, { $set: user })
      .exec()
      .then((res) => res)
      .catch((err) => Promise.reject(err))
      .finally(() => console.log("update finished"));
  }
  public static async getOne(id: string): Promise<any> {
    const _id = new ObjectID(id);
    return UserModel.findOne({ _id })
      .exec()
      .then((res) => res)
      .catch((err) => Promise.reject(err))
      .finally(() => console.log("getOne finished"));
  }
  public static async getAll(): Promise<any> {
    return UserModel.find({})
      .exec()
      .then((res) => res)
      .catch((err) => Promise.reject(err))
      .finally(() => console.log("getAll finished"));
  }
}
