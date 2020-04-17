import { check } from 'express-validator';
import { Router } from 'express';
import AuthController from '../controller/auth.controller';
import { CheckErr } from '../../../middlewares/checkErr';

const AuthRoute = Router()
const { login, logout } = AuthController

AuthRoute.post('/user/login',
[
    check("email").isEmail(),
    check("email").not().isEmpty(),
    CheckErr()
],
login);

AuthRoute.post('/logout', logout)

export default AuthRoute
