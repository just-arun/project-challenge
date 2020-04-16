import { User } from "./../models/user.model";
import { NextFunction, Request, Response } from "express";
import UserService from "../services/user.service";
import HttpStatus from "../../../util/statusCode";
import uploadImg from "../../../middlewares/fileUpload";
import { NewErr } from "../../../middlewares/errorHandler";

export default class UserController {
  public static async create(req: Request, res: Response, next: NextFunction) {
    uploadImg(req, res, (err: any) => {
      if (err) {
        next(new NewErr(500, "Image not fount"));
      } else {
        const user: User = req.body;
        console.log({ user });
        console.log(req.file);
        next(new NewErr(HttpStatus.formErr, "error"));
      }
    });
    // return {User}Service.create(user)
    //   .then((data) => res.status(HttpStatus.ok).json({ data }))
    //   .catch((err) => next(err));
  }
  public static async update() {}
}
