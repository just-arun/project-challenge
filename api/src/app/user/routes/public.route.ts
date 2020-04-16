import { CheckErr } from './../../../middlewares/checkErr';
import { Router } from "express";
import { check } from 'express-validator';
import uploadImg from "../../../middlewares/fileUpload";


const router = Router()

router.post('/register',[
    check('email').isEmail(),
    check('password').not().isEmpty(),
    check('dob').not().isEmpty(),
    check('phoneNumber').not().isEmail(),
    check('address').not().isEmail()
], CheckErr(), uploadImg);

export default router