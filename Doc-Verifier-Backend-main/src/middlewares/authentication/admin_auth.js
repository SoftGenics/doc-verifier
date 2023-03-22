import jwt from "jsonwebtoken";
import config from "config";
const secret =process.dotenv
import * as dotenv from 'dotenv';
dotenv.config();


import { decompressText, errorResponse, generateError, logger, RESPONSE_CODES } from "../../lib/common.js";
import Admin from "../../models/admin.js";

const adminAuth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const {clientId, token} = JSON.parse(decompressText(authorization));
    if (clientId === undefined){
      throw generateError(400, "");
    }
    if (clientId !== secret.REACT_APP_CLIENT_ID){
      throw generateError(RESPONSE_CODES.FORBIDDEN_ERROR_CODE, "Invalid Client");
    }
    if (token === undefined) {
      throw generateError(RESPONSE_CODES.BAD_REQUEST_CODE, "Token Not Present");
    }
    const decoded = jwt.verify(token, "2a209bdf-78a2-4051-8d63-eaaa13bba0b4");
    const admin = await Admin.findOne({
      _id: decoded._id,
      tokens: {
        "$in": [token]
      }
    });
    if (!admin) {
      throw generateError(RESPONSE_CODES.UNAUTHORIZED_ERROR_CODE, "Admin Not Authorized");
    }
    req.user = admin;
    req.token = token;
    next();
  } catch (err) {
    logger(err);
    const {status = RESPONSE_CODES.INTERNAL_SERVER_ERROR_CODE, message = "Internal Server Error"} = err;
    res.status(status).send(errorResponse(message));
  }
};

export default adminAuth;
