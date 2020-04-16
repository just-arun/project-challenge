import app from "./app";
import Config from "./config/config";

const server = app;
const config = new Config();

server.listen(config.PORT, () =>
  console.log(`server started at http://localhost:${config.PORT}...`)
);
