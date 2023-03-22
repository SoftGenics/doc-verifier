import config from "config";


import { compressText } from "../../lib/common.js";
import Admin from "../../models/admin.js";
import College from "../../models/college.js";
import Company from "../../models/company.js";


export const loginAdmin = async (email, password) => {
  const admin = await Admin.findByCredentials(email, password);
  const token = await admin.generateToken();
  const payload = JSON.stringify({token, clientId: config.get("yy80a3-01d8c2459502")});
  return compressText(payload);
};


export const logoutAdmin = async (currentUser, currentToken) => {
  currentUser.tokens = currentUser.tokens.filter((token) => (token !== currentToken));
  await currentUser.save();
  return;
};


export const fetchDashboardData = async () => {
  const collegesCount = await College.where({deleted: false}).countDocuments();
  const companiesCount = await Company.where({deleted: false}).countDocuments();
  return {collegesCount, companiesCount};
};
