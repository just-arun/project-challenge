import { Request, Response, NextFunction } from "express";

export const ErrorHandle = () => {
  return (err: NewErr, req: Request, res: Response, next: NextFunction) => {
    res.status(err.code || 500).json({ error: { message: err.message } });
  };
};

export class NewErr extends Error {
  public code: number;
  constructor(code: number, message: string) {
    super();
    this.message = message;
    this.code = code;
  }
}
