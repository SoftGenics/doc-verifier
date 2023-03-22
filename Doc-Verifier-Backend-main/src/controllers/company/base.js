import config from "config";
import pkg from "lodash";
import bcrypt from "bcrypt";
const { omit } = pkg;
const secret =process.dotenv
import * as dotenv from 'dotenv';
dotenv.config();

import { compressText, generateError, RESPONSE_CODES } from "../../lib/common.js";
import Company from "../../models/company.js";


const GET_KEYS_NOT_TO_EXPOSE = ["password", "tokens", "blocked", "deleted", "currentToken", "logs",
  "registeredBy", "createdAt", "updatedAt", "__v"];

export const loginCompany = async (email, password) => {
  const college = await Company.findByCredentials(email, password);
  const token = await college.generateToken();
  const payload = JSON.stringify({token, clientId: "6c995852-0e2b-4295-80a3-01d8c2459502"});
  return compressText(payload);
};


export const logoutCompany = async (company, currentToken) => {
  company.tokens = company.tokens.filter((token) => (token !== currentToken));
  await company.save();
  return;
};


export const fetchCompanyData = async (company) => {
  return omit(company.toObject(), GET_KEYS_NOT_TO_EXPOSE);
};


export const updateCompanyInfo = async (params, company) => {
  if (params.newPassword !== undefined) {
    const isOldPasswordCorrect = await bcrypt.compare(params.oldPassword || "", company.password);
    if (!isOldPasswordCorrect) {
      throw generateError(RESPONSE_CODES.BAD_REQUEST_CODE, "Old Password is Incorrect");
    }
    params["password"] = params.newPassword;
  }
  let paramsToUpdate = omit(params, ["oldPassowrd", "newPassword"]);
  Object.keys(paramsToUpdate).forEach(key => {
    company[key] = paramsToUpdate[key];
  });
  await company.save();
  return await fetchCompanyData(company);
};
