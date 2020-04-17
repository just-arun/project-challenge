import { CheckErr } from "./../../../middlewares/checkErr";
import { Auth } from "./../../../middlewares/auth/auth";
import { check } from "express-validator";
import { Router } from "express";
import PostController from "../controller/post.controller";
import { img } from "../../../middlewares/prepareImg";

const PostRoute = Router();

PostRoute.post(
  "/",
  [
    check("title").not().isEmpty(),
    check("body").not().isEmpty(),
    CheckErr(),
    img(),
  ],
  Auth(),
  PostController.create
);

PostRoute.get("/all", PostController.getAll);

PostRoute.get("/mine", PostController.getMine);

PostRoute.get("/:id", PostController.getOne);

export default PostRoute;
