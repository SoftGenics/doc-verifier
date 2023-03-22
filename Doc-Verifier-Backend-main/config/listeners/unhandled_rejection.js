import process from "process";

import {logger} from "../../src/lib/common.js";

process.on("unhandledRejection", (reason, promise) => {
  logger(`Unhandled Rejection at ${promise} due to ${reason}`);
});
