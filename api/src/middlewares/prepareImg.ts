import { Request, Response, NextFunction } from "express";
import uploadImg from "./fileUpload";
import HttpStatus from "../util/statusCode";

export const img = () => {
  return (req: any, res: Response, next: NextFunction) => {
    uploadImg(req, res, (err: any) => {
      if (err) {
        res
          .status(HttpStatus.formErr)
          .json({ error: { message: "image is required" } });
      } else {
        req.img = req.file ? `uploads/${req.file.filename}` : null;
        next();
      }
    });
  };
};
