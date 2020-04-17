import { ObjectID } from "bson";
import { Comments, CommentModel } from "./../models/comments.model";
import { NewErr } from "./../../../middlewares/errorHandler";
import { Response, Request, NextFunction } from "express";
import CommentService from "../services/commnet.service";
import HttpStatus from "../../../util/statusCode";

export default class CommentController {
  public static async create(req: any, res: Response, next: NextFunction) {
    try {
      const comment: Comments = req.body;
      comment.user = new ObjectID(req.uID);
      comment.img = req.img;
      return CommentService.create(comment)
        .then((data) => res.status(HttpStatus.ok).json({ data }))
        .catch((err) => next(new NewErr(err.code || 500, err.message || err)));
    } catch (err) {
      next(new NewErr(err.code || 500, err.message || err));
    }
  }
  public static async getOne(req: any, res: Response, next: NextFunction) {
    try {
        return CommentService.getOne(req.params.id)
        .then((data) => res.status(HttpStatus.ok).json({ data }))
        .catch((err) => next(new NewErr(err.code || 500, err.message || err)));
    } catch (err) {
      next(new NewErr(err.code || 500, err.message || err));
    }
  }
}
