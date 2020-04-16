import Config from './config/config';

import { ErrorHandle } from './middlewares/errorHandler';
import { DB } from "./boot/db";
import express, { Application } from "express";
import CookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import UserRoute from './app/user/routes';
import AuthRoute from './app/auth/routes';

const app: Application = express();
const { json, urlencoded } = express;


const config = new Config

const whitelist = config.corsWhitelist
console.log(whitelist);

export const CorsOptions = {
  origin: (origin: any, callback: any) => {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      // callback(null, true)
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true
}


DB();
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(CookieParser());

// route handlers
app.use('/auth', cors(CorsOptions), AuthRoute)
app.use("/user", cors(CorsOptions), UserRoute)
// error handler
app.use(ErrorHandle())

export default app;
