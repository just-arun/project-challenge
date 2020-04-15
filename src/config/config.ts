import { config } from "dotenv";
export default class Config {
  public PORT!: number;
  public dbURI!: string;
  constructor() {
    config();
    this.initFun();
  }
  initFun() {
    const env = process.env;
    this.PORT = Number(env.PORT);
    this.dbURI = String(env.DATABASE_URI);
  }
}
