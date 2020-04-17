import { NewErr } from "./../../../middlewares/errorHandler";
import { User } from "./../../user/models/user.model";
import { NextFunction, Request, Response } from "express";
import AuthService from "../service/auth.service";
import Config from "../../../config/config";
import HttpStatus from "../../../util/statusCode";

export default class AuthController {
  public static async login(req: Request, res: Response, next: NextFunction) {
    const user: User = req.body;
    return AuthService.login(user)
      .then((data) => {
        const config = new Config();
        const { access, refresh } = data;
        res.cookie(
          config.accessCookieName,
          access,
          { httpOnly: true, maxAge: config.tenMin }
        );
        res.cookie(
          config.refreshCookieName,
          refresh,
          { httpOnly: true, maxAge: config.oneWeek }
        );
        res.status(HttpStatus.ok).json({data})
      })
      .catch((err: any) =>
        next(new NewErr(err.code || 500, err.message || "error occurred"))
      );
  }
  static cookieOption(maxAge: number) {
    return { httpOnly: true, maxAge };
  }

  static async logout(req: Request, res: Response, next: NextFunction) {
    const config = new Config();
    res.cookie(
      config.accessCookieName,
      "",
      { maxAge: -1 }
    );
    res.cookie(
      config.refreshCookieName,
      "",
      { maxAge: - 1 }
    );
    res.sendStatus(HttpStatus.ok)
  }
}
