import { config } from "dotenv";
export default class Config {
  public PORT!: number;
  public dbURI!: string;
  public corsWhitelist!: string[];
  public uploadLocation!: string;
  constructor() {
    config();
    this.initFun();
  }
  initFun() {
    const env = process.env;
    this.PORT = Number(env.PORT);
    this.dbURI = String(env.DATABASE_URI);
    this.corsWhitelist = String(env.CORS_WHITE_LIST).split(',')
    this.uploadLocation = String(env.ENV) == "dev" ? "src" : "dist"
  }
}
