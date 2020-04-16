import Config from "./config"

const config = new Config()

const whitelist = config.corsWhitelist
console.log(whitelist);

export const CorsOptions = {
  origin: (origin: any, callback: any) => {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  // withCredentials: true
}