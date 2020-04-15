import { connect } from "mongoose";
import Config from "../config/config";

export const DB = () => {
  const config = new Config();
  return connect(config.dbURI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
    .then(() => console.log("DB connected..."))
    .catch((err) => {
      console.error("ERROR:", err);
    });
};
