import { generateError, RESPONSE_CODES } from "../../lib/common.js";
import Certificate from "../../models/certificate.js";
import Document from "../../models/document.js";
import User from "../../models/user.js";


export const fetchExternalCertificatesList = async (company) => {
  const employees = await company.employees();
  const certificates = await Certificate.find({"issuedBy.id": company._id, "issuedToUserId": {
    "$nin": employees.map((employee) => employee.userId)
  }});
  const renderCertificates = certificates.map((certificate, idx) => {
    return {
      ...certificateObjectForList(certificate),
      index: idx + 1
    };
  });
  return {certificates: renderCertificates};
};


export const assignExternalCertificateStatus = async (certificateId, status, company) => {
  const certificate = await Certificate.findById(certificateId);
  certificate.status = status;
  await certificate.save();
  return await fetchExternalCertificatesList(company);
};


export const checkUserEmail = async (userEmail) => {
  const user = await User.findByEmail(userEmail);
  if (user === null) {
    return {valid: false};
  }
  return {valid: true};
};


/**
 * TODO: Integrate blockchain with it.
 */
export const issueNewExternalCertificate = async (params, company) => {
  const document = await Document.findOne({downloadLink: params.certificateUrl});
  const user = await User.findByEmail(params.userEmail);
  if (!user) {
    throw generateError(RESPONSE_CODES.BAD_REQUEST_CODE, "User email is invalid");
  }
  const certificate = new Certificate({
    name: params.certificateName,
    uniqueId: "TBS",
    downloadLink: params.certificateUrl,
    documentId: document._id,
    issuedBy: {
      id: company._id,
      entity: "company",
      name: company.name,
    },
    autoVerified: true,
    category: params.certificateCategory,
    issuedToUserId: user._id,
    issuedToUser: {
      id: user._id,
      email: user.email,
      name: user.name,
    },
    blockchainHash: "To be Added",
    status: "verified"
  });
  await certificate.save();
};


// Utilites
const certificateObjectForList = (certificate) => {
  return {
    key: certificate._id,
    id: certificate._id,
    userEmail: certificate.issuedToUser.email,
    certificateID: certificate.uniqueId,
    certificateName: certificate.name,
    category: certificate.category,
    status: certificate.status,
    url: certificate.downloadLink,
  };
};
