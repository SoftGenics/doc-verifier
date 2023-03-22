import {Storage} from "@google-cloud/storage";
import path from "path";
import config from "config";

import { dirname} from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const storage = new Storage({
  projectId: "docs-verifier",
  keyFilename: path.resolve(__dirname, './creds/docs-verifier-firebase-adminsdk-42skr-dfb86e6873.json')
});


const bucket = storage.bucket("gs://docs-verifier.appspot.com");

export {bucket};
