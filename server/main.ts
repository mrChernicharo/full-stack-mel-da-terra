const dotenv = require("dotenv");

const envConfig = dotenv.config();
if (envConfig.error) {
  throw envConfig.error;
}
// console.log("Loaded env config: ", envConfig.parsed);

import { initServer } from "./server";

initServer();
