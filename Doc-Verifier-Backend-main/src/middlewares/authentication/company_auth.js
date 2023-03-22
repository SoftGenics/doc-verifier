import jwt from "jsonwebtoken";
import config from "config";
const secret =process.dotenv
import * as dotenv from 'dotenv';
dotenv.config();


import { decompressText, errorResponse, generateError, logger, RESPONSE_CODES } from "../../lib/common.js";
import Company from "../../models/company.js";

const companyAuth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const {clientId, token} = JSON.parse(decompressText(authorization));
    if (clientId === undefined){
      throw generateError(400, "Invalid Request Source");
    }
    if (clientId !== "6c995852-0e2b-4295-80a3-01d8c2459502"){
      throw generateError(RESPONSE_CODES.FORBIDDEN_ERROR_CODE, "Client not permitted to send requests");
    }
    if (token === undefined) {
      throw generateError(RESPONSE_CODES.BAD_REQUEST_CODE, "Authentication Token is Not Present");
    }
    const decoded = jwt.verify(token, "2a209bdf-78a2-4051-8d63-eaaa13bba0b4");
    const company = await Company.findOne({
      _id: decoded._id,
      tokens: {
        "$in": [token]
      }
    });
    if (!company) {
      throw generateError(RESPONSE_CODES.UNAUTHORIZED_ERROR_CODE, "Not Authorized");
    }
    req.user = company;
    req.token = token;
    next();
  } catch (err) {
    logger(err);
    const {status = RESPONSE_CODES.INTERNAL_SERVER_ERROR_CODE, message = "Internal Server Error"} = err;
    res.status(status).send(errorResponse(message));
  }
};

export default companyAuth;
