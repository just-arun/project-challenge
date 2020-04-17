import { ObjectID } from "bson";
import { Post } from "./../models/post.model";
import { NewErr } from "./../../../middlewares/errorHandler";
import { Request, Response, NextFunction } from "express";
import HttpStatus from "../../../util/statusCode";
import PostService from "../services/post.service";

export default class PostController {
  public static async create(req: any, res: Response, next: NextFunction) {
    try {
      let post: Post = req.body;
      const id = req.uID;
      const img = req.img;
      post.author = new ObjectID(id);
      post.img = img;
      const data = await PostService.createPost(id, post);
      res.status(HttpStatus.ok).json({ data });
    } catch (err) {
      next(new NewErr(err.code || 500, err.message || "Error occurred"));
    }
  }
  public static async getOne(req: any, res: Response, next: NextFunction) {
    return PostService.getOne(req.params.id)
      .then((data) => res.status(HttpStatus.ok).json({ data }))
      .catch((err) =>
        next(new NewErr(err.code || 500, err.message || "Error occurred"))
      );
  }

  public static async getAll(req: Request, res: Response, next: NextFunction) {
    return PostService.getAll()
      .then((data) => res.status(HttpStatus.ok).json({ data }))
      .catch((err) =>
        next(new NewErr(err.code || 500, err.message || "Error occurred"))
      );
  }

  public static async getMine(req: any, res: Response, next: NextFunction) {
    try {
      const id = req.uID;
      return PostService.getAll(id).then((data) =>
        res.status(HttpStatus.ok).json({ data })
      );
    } catch (err) {
      next(new NewErr(err.code || 500, err.message || "Error occurred"))
    }
  }
}
