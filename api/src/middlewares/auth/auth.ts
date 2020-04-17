import { Request, Response, NextFunction } from "express";
import HttpStatus from "../../util/statusCode";
import jwt from "jsonwebtoken";
import { ObjectID } from "bson";
import Configuration from "../../config/config";
import { UserModel } from "../../app/user/models/user.model";
import AuthService from "../../app/auth/service/auth.service";
import Config from "../../config/config";

export const Auth = () => {
  return async (req: any, res: Response, next: any) => {
    try {
      const config = new Config();
      const access = req.cookies[config.accessCookieName];
      const refresh = req.cookies[config.refreshCookieName];
      console.log(access);
      if (access !== undefined) {
        const token: any = jwt.verify(access, config.jwtSecret);
        console.log({ token });
        if (token.exp === undefined) {
          return res
            .status(HttpStatus.unauthorized)
            .json({ error: { message: "Unauthorized" } });
        }
        if (Date.now() > token.exp) {
          return res
            .status(HttpStatus.unauthorized)
            .json({ error: { message: "Unauthorized" } });
        }
        const _id = new ObjectID(token.id);
        return UserModel.findOne({ _id })
          .then((user: any) => {
            if (!user) {
              return res
                .status(HttpStatus.unauthorized)
                .json({ error: { message: "Unauthorized" } });
            } else {
              let rollExist = true;
              if (rollExist) {
                req.email = user.email
                req.uID = user._id
                return next();
              } else {
                return res
                  .status(HttpStatus.unauthorized)
                  .json({ error: { message: "Unauthorized" } });
              }
            }
          })
          .catch((err) => {
            return err;
          });
      } else {
        if (refresh === undefined) {
          return res
            .status(HttpStatus.unauthorized)
            .json({ error: { message: "Unauthorized" } });
        }
        const token: any = jwt.verify(refresh, config.jwtSecret);
        if (token.exp === undefined) {
          return res
            .status(HttpStatus.unauthorized)
            .json({ error: { message: "Unauthorized" } });
        }
        if (Date.now() > token.exp) {
          return res
            .status(HttpStatus.unauthorized)
            .json({ error: { message: "Unauthorized" } });
        }
        const _id = new ObjectID(token.id);
        const data = await UserModel.find({});
        console.log({ data });
        return UserModel.findOne({ _id })
          .then((user: any) => {
            if (!user) {
              // tslint:disable-next-line:no-console

              return res
                .status(HttpStatus.unauthorized)
                .json({ error: { message: "Unauthorized" } });
            } else {
              let rollExist = true;
              if (rollExist) {
                return AuthService.createJwt(user._id)
                  .then((toc: any) => {
                    const accessT = toc.access;
                    const refreshT = toc.refresh;
                    res.cookie(
                      config.accessCookieName,
                      { ref: accessT },
                      { httpOnly: true, maxAge: 600000 }
                    );
                    res.cookie(
                      config.refreshCookieName,
                      { ref: refreshT },
                      { httpOnly: true, maxAge: config.oneWeek }
                    );
                    req.email = user.email
                    req.uID = user._id
                    return next();
                  })
                  .catch((err) =>
                    res
                      .status(HttpStatus.unauthorized)
                      .json({ error: { message: "Unauthorized" } })
                  );
              } else {
                return res
                  .status(HttpStatus.unauthorized)
                  .json({ error: { message: "Unauthorized" } });
              }
            }
          })
          .catch((err) => {
            return res
              .status(HttpStatus.unauthorized)
              .json({ error: { message: "Unauthorized" } });
          });
      }
    } catch (err) {
      console.log(err);
      return res
        .status(HttpStatus.unauthorized)
        .json({ error: { message: "Unauthorized" } });
    }
  };
};
