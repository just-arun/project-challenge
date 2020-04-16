import { config } from "dotenv";
export default class Config {
  public PORT!: number;
  public dbURI!: string;
  public corsWhitelist!: string[];
  public uploadLocation!: string;
  public jwtSecret!: string;
  public oneWeek!: number;
  public tenMin!: number;
  public accessCookieTime!: number;
  public refreshCookieTime!: number;
  public accessCookieName!: string;
  public refreshCookieName!: string;
  public cookieSecret!: string;
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
    this.jwtSecret = String(env.JWT_SECRET)
    this.oneWeek = Number(env.ONE_WEEK)
    this.tenMin = Number(env.TEN_MIN)
    let date1 = new Date()
    let date2 = new Date()
    this.accessCookieTime = date1.setMinutes(date1.getMinutes() + 10)
    this.refreshCookieTime = date2.setDate(date2.getDate() + 7)
    this.accessCookieName = String(env.A_COOKIE);
    this.refreshCookieName = String(env.R_COOKIE);
    this.cookieSecret = String(env.COOKIE_SECRET);
  }
}
