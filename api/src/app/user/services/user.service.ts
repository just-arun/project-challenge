import { NewErr } from "./../../../middlewares/errorHandler";
import { UserModel, User } from "./../models/user.model";
import { ObjectID } from "bson";
import HttpStatus from "../../../util/statusCode";
import AuthService from "../../auth/service/auth.service";

export default class UserService {
  public static async create(user: User): Promise<any> {
    return await UserModel.findOne({ email: user.email })
      .exec()
      .then(async (userExist) => {
        if (userExist) {
          return Promise.reject(
            new NewErr(
              HttpStatus.conflict,
              "user already exist with same email"
            )
          );
        } else {
          return await AuthService.creatHash(user.password)
          .then((hash: string) => {
            user.password = hash
            return new UserModel(user)
              .save()
              .then((res) => res)
              .catch((err) => Promise.reject(err))
              .finally(() => console.log("create finished"));
          }).catch(err => Promise.reject(err))
        }
      })
      .catch((err) => Promise.reject(err));
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
      .then((res: any) => {
        let data = res
        delete data.password
        return data
      })
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
