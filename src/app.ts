import { DB } from './boot/db';
import express, { Application } from "express";

const app: Application = express();
const { json, urlencoded } = express;
DB();

app.use(json())
app.use(urlencoded({extended: false}))

export default app;
