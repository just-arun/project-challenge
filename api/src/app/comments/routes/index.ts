import { Auth } from "./../../../middlewares/auth/auth";
import { img } from "./../../../middlewares/prepareImg";
import { CheckErr } from "./../../../middlewares/checkErr";
import { check } from "express-validator";
import { Router } from "express";
import CommentController from "../components/commnet.component";

const CommentRoutes = Router();

CommentRoutes.post(
  "/",
  Auth(),
  [check("comment").not().isEmpty(), check("post").not().isEmpty(), CheckErr()],
  img(),
  CommentController.create
);

CommentRoutes.get("/:id", CommentController.getOne);

CommentRoutes.get("/:id", CommentController.getOne);

export default CommentRoutes;
