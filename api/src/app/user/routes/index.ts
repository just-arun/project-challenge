import { Auth } from './../../../middlewares/auth/auth';
import { CheckErr } from "./../../../middlewares/checkErr";
import { Router } from "express";
import { check } from "express-validator";
import UserController from "../controller/user.controller";

const UserRoute = Router();
const { create, getOne } = UserController

UserRoute.post(
  "/register",
  [
    check("email").isEmail(),
    check("password").not().isEmpty(),
    check("dob").not().isEmpty(),
    check("phoneNumber").not().isEmpty(),
    check("address").not().isEmpty(),
  ],
  CheckErr(),
  create
);

UserRoute.get("/me", Auth(), getOne)

export default UserRoute;
