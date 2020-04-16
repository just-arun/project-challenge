import { User } from "./../models/user.model";
import { NextFunction, Request, Response } from "express";
import UserService from "../services/user.service";
import HttpStatus from "../../../util/statusCode";
import uploadImg from "../../../middlewares/fileUpload";
import { NewErr } from "../../../middlewares/errorHandler";
import AuthController from "../../auth/controller/auth.controller";
import Config from "../../../config/config";
import AuthService from "../../auth/service/auth.service";

export default class UserController {
  public static async create(req: Request, res: Response, next: NextFunction) {
    uploadImg(req, res, (err: any) => {
      if (err) {
        next(new NewErr(500, "Image not fount"));
      } else {
        const user: User = req.body;
        user.img = `uploads/${req.file.filename}`
        return UserService.create(user)
          .then(async (data) => {
            const config = new Config();
            const { access, refresh } = await AuthService.createJwt(data._id);
            res.cookie(
              config.accessCookieName,
              access,
              AuthController.cookieOption(config.tenMin)
            );
            res.cookie(
              config.refreshCookieName,
              refresh,
              AuthController.cookieOption(config.oneWeek)
            );
            res.status(HttpStatus.ok).json({data})
          })
          .catch((err) => next(err));
      }
    });
  }
  public static async update() {}
  public static async getOne(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id
    return UserService.getOne(id)
    .then((data) => {
      console.log(data);
      res.status(HttpStatus.ok).json({data})
    })
    .catch(err => Promise.reject(err))
  }
}
