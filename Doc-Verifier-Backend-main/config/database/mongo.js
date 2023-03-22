import mongoose from "mongoose";
import config from "config";

import { successLog, errorLog } from "../../src/lib/common.js";

const dbProperties = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect("mongodb://localhost:27017/doc_verifire", dbProperties).then(()=>{
  successLog("Connection to Mongo successful");
}).catch((err) => {
  errorLog(err.message);
  process.exit();
});
