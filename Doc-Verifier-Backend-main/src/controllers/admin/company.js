import pkg from "lodash";
const { omit } = pkg;


import Company from "../../models/company.js";


const GET_KEYS_NOT_TO_EXPOSE = ["password", "tokens", "blocked", "deleted", "currentToken", "logs"];


/**
 *
 * @param {No support} pageNo
 * @param {No support} perPage
 * @param {No support} filter
 * @returns list of colleges
 */
export const fetchCompanyList = async (_pageNo, _perPage, _filter) => {
  const companiesList = await Company.find({deleted: false}).select("uniqueId name email createdAt totalCertificatesUploaded certificateQuota blocked correspondent");
  let listToExpose = [];
  for (let i = 0;i < companiesList.length;i++) {
    listToExpose.push({...prepareCompanyObjectForList(companiesList[i]), index: i + 1});
  }
  return {companies: listToExpose};
};


export const toggleBlockCompany = async (requiredState, companyId, currentUser) => {
  const company = await Company.findById(companyId);
  company.blocked = requiredState === "block" ? true : false;
  company.logs.push({
    action: `Company ${requiredState === "block" ? "Blocked" : "Unblocked"}`,
    userId: currentUser._id,
    actionTime: new Date(),
  });
  await company.save();
  return await fetchCompanyList();
};


export const deleteCompany = async (companyId, currentUser) => {
  const company = await Company.findById(companyId);
  company.deleted = true;
  company.logs.push({
    action: "Company Deleted",
    userId: currentUser._id,
    actionTime: new Date(),
  });
  await company.save();
  return await fetchCompanyList();
};


export const fetchCompanyDetails = async (companyId) => {
  const company = await Company.findById(companyId);
  let companyObject = company.toObject();
  return omit(companyObject, GET_KEYS_NOT_TO_EXPOSE);
};


export const createCompany = async (companyParams, currentUser) => {
  const company = new Company({...companyParams, registeredBy: currentUser._id, uniqueId: "TBS"});
  await company.save();
};


export const updateCompany = async (companyParams, companyId, currentUser) => {
  let company = await Company.findById(companyId);
  for (const key of Object.keys(companyParams)) {
    company[key] = companyParams[key];
  }
  company.logs.push({
    action: "Company Updated",
    userId: currentUser._id,
    actionTime: new Date(),
  });
  await company.save();
  return omit(company.toObject(), GET_KEYS_NOT_TO_EXPOSE);
};



// Utilities
const prepareCompanyObjectForList = (company) => {
  return {
    key: company._id,
    id: company._id,
    companyID: company.uniqueId,
    companyName: company.name,
    companyEmail: company.email,
    registeredOn: company.createdAt,
    certificatesUploaded: company.totalCertificatesUploaded,
    certificatesQuota: company.certificateQuota,
    status: company.blocked === true ? "blocked" : "Active",
    correspondent: company.correspondent
  };
};
