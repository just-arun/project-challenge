import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import HttpStatus from "../util/statusCode";

export const CheckErr = () => {
  return (error: any, req: Request, res: Response, next: NextFunction) => {
    console.log({data: req.body});
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(HttpStatus.formErr).json({ errors: errors.array() });
    } else {
      next()
    }
  };
};
