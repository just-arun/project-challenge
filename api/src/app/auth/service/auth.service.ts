import { NewErr } from "./../../../middlewares/errorHandler";
import { User } from "./../../user/models/user.model";
import { UserModel } from "../../user/models/user.model";
import bcrypt from "bcryptjs";
import HttpStatus from "../../../util/statusCode";
import JWT from 'jsonwebtoken'
import Config from "../../../config/config";

export default class AuthService {
  public static async login(user: User) {
    return this.findUser(user.email || "")
      .then((dbUser: any) => {
        if (dbUser) {
          return this.comparePwd(user.password, dbUser.password).then(
            async (passwordMatch) => {
              if (passwordMatch) {
                const { access, refresh } = await this.createJwt(dbUser._id)
                return {
                  _id: dbUser._id,
                  access,
                  refresh
                }
              } else {
                return Promise.reject(
                  new NewErr(HttpStatus.badeCredentials, "Bade Credentials")
                );
              }
            }
          );
        } else {
          return Promise.reject(
            new NewErr(HttpStatus.badeCredentials, "Bade Credentials")
          );
        }
      })
      .catch((err) => Promise.reject(err));
  }

  public static async findUser(email: string) {
    return UserModel.findOne({ email })
      .then((user) => (user ? user : false))
      .catch((err) => Promise.reject(err));
  }

  public static async comparePwd(password: string, hash: string) {
    return bcrypt
      .compare(password, hash)
      .then((res) => res)
      .catch((err) => Promise.reject(err));
  }

  public static async creatHash(password: string) {
    return bcrypt
      .genSalt(10)
      .then((salt) => {
        return bcrypt
          .hash(password, salt)
          .then((hash) => hash)
          .catch((err) => Promise.reject(err));
      })
      .catch((err) => Promise.reject(err));
  }

  public static async createJwt(id: string) {
    const config = new Config()
    const secret = config.jwtSecret
    const token = (expiresIn: number)  => {
      return JWT.sign({id}, secret, { expiresIn })
    }
    return {
      access: token(config.tenMin),
      refresh: token(config.oneWeek),
    }
  }
}
