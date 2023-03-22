import pkg from "lodash";
const { omit } = pkg;


import Application from "../../models/user/application.js";
import Certificate from "../../models/certificate.js";
import User from "../../models/user.js";


const CANDIDATE_GET_KEYS_NOT_TO_EXPOSE = ["password", "tokens", "blocked", "deleted", "currentToken", "otherEmails",
  "registeredBy", "createdAt", "updatedAt", "__v", "secondaryNumber"];


export const fetchApplicationsList = async (companyId) => {
  const applications = await Application.find({"appliedFor.id": companyId});
  const renderApplications = applications.map((employee, idx) => {
    return {
      ...applicationObjectForList(employee),
      index: idx + 1
    };
  });
  return {applications: renderApplications};
};


export const fetchApplicationInfo = async (applicationId) => {
  const application = await Application.findById(applicationId);
  const candidate = await User.findById(application.candidateDetails.id);
  const certificates = await Certificate.find({_id: application.certificates.map((certificate) => certificate.id)});
  const renderCerts = certificates.map((certificate, idx) => {
    return {
      ...certificateObjectForList(certificate),
      index: idx + 1
    };
  });
  return {application: applicationObjectForList(application), candidateDetails: omit(candidate.toObject(),
    CANDIDATE_GET_KEYS_NOT_TO_EXPOSE), certificates: renderCerts};
};


export const assignApplicationStatus = async (applicationId, status, company) => {
  const application = await Application.findById(applicationId);
  application.status = status;
  await application.save();
  return await fetchApplicationsList(company._id);
};


export const assignApplicationStatusV2 = async (applicationId,  status) => {
  const application = await Application.findById(applicationId);
  application.status = status;
  await application.save();
  return await fetchApplicationInfo(applicationId);
};


// Utilites
const applicationObjectForList = (application) => {
  const certificateStats = {
    rejected: application.certificates.filter((certificate) => certificate.status === "rejected").length,
    verified: application.certificates.filter((certificate) => certificate.status === "verified").length,
    pending: application.certificates.filter((certificate) => certificate.status === "pending").length,
  };
  return {
    key: application._id,
    id: application._id,
    applicationID: application.uniqueId,
    candidateName: application.candidateDetails.name,
    candidateEmail: application.candidateDetails.email,
    appliedOn: application.createdAt,
    status: application.status,
    certificateStats,
  };
  // key: "637fdb89f7610823c0afe96a",
  // id: "637fdb89f7610823c0afe96a",
  // candidateID: "DVORG5",
  // candidateName: "Ward LLC",
  // candidateEmail: "kathryn_kris61@hotmail.com",
  // appliedOn: "2022-11-24T21:00:57.814Z",
  // certificateStatus: "verified",
  // status: "Active",
  // index: 5,
};

const certificateObjectForList = (certificate) => {
  return {
    key: certificate._id,
    id: certificate._id,
    certificateID: certificate.uniqueId,
    certificateName: certificate.name,
    category: certificate.category,
    issuedOn: certificate.createdAt,
    status: certificate.status.toLowerCase(),
    url: certificate.status.downloadLink,
  };
};


