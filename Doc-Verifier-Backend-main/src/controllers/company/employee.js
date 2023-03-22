import pkg from "lodash";
const { omit } = pkg;


import Employee from "../../models/company/employee.js";
import Certificate from "../../models/certificate.js";
import Document from "../../models/document.js";
import User from "../../models/user.js";


const EMPLOYEE_GET_KEYS_NOT_TO_EXPOSE = ["registeredBy", "createdAt", "updatedAt", "__v"];


export const fetchEmployeesList = async (companyId) => {
  const employees = await Employee.find({deleted: false, registeredBy: companyId});
  const listToRender = employees.map((employee, idx) => {
    return {
      ...employeeObjectForList(employee),
      index: idx + 1
    };
  });
  return {employees: listToRender};
};


export const fetchEmployeeData = async (employeeId, companyId) => {
  const employee = await Employee.findOne({_id: employeeId, deleted: false, registeredBy: companyId});
  const certificates = await fetchEmployeeCertificate(companyId, employeeId);
  return {employeeDetail: omit(employee.toObject(), EMPLOYEE_GET_KEYS_NOT_TO_EXPOSE), certificates};
};


export const deleteEmployee = async (employeeId) => {
  await Employee.findByIdAndUpdate(employeeId, {deleted: true});
};


export const assignCertificateStatus = async (employeeId, certificateId, status, companyId) => {
  const certificate = await Certificate.findById(certificateId);
  certificate.status = status;
  await certificate.save();
  return await fetchEmployeeData(employeeId, companyId);
};


/**
 * TODO: Integrate blockchain with it.
 */
export const issueNewCertificate = async (params, company) => {
  const document = await Document.findOne({downloadLink: params.certificateLink});
  // Here sending only the employee email becuase user already exists.
  const userId = await User.findOrCreateUserByEmployeeParams({email: params.employeeEmail});
  const employee = await Employee.findOne({email: params.employeeEmail});
  const user = await User.findById(userId);
  console.log(user);
  const certificate = new Certificate({
    name: params.certificateName,
    uniqueId: "TBS",
    downloadLink: params.certificateLink,
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
  const certificates = await fetchEmployeeCertificate(company._id, employee._id);
  return {certificates};
};


/**
 * TODO: send an Email to the registered employee regarding the email and password
*/
export const createEmployee = async (params, companyId) => {
  const employee = new Employee({
    ...params,
    registeredBy: companyId
  });
  employee.userId = await User.findOrCreateUserByEmployeeParams(employee.toObject());
  await employee.save();
};


/**
 * TODO: send an Email to the registered employee regarding the change in the email.
 * Also suggest him to change the primary email from corporate email to personal email to avoid
 * such changes.
*/
export const updateEmployeeDetails = async (params) => {
  let existingEmployee = await Employee.findById(params.id);
  if (existingEmployee.email !== params.email) {
    await User.updateUserByEmployeeParams(existingEmployee.userId, params.email, existingEmployee.email);
  }
  Object.keys(params).forEach(key => {
    existingEmployee[key] = params[key];
  });
  await existingEmployee.save();
  return omit(existingEmployee.toObject(), EMPLOYEE_GET_KEYS_NOT_TO_EXPOSE);
};


// Util
const employeeObjectForList = (employee) => {
  return {
    key: employee._id,
    id: employee._id,
    employeeID: employee.uniqueId,
    employeeName: employee.name,
    employeeEmail: employee.email,
    registeredOn: employee.createdAt,
  };
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
    url: certificate.downloadLink,
  };
};


const fetchEmployeeCertificate = async (companyId, employeeId) => {
  const certificates = await Certificate.find({"issuedBy.id": companyId, "issuedToUser.id": employeeId});
  const certificatesToRender = certificates.map((certificate, idx) => {
    return {
      ...certificateObjectForList(certificate),
      index: idx + 1
    };
  });
  return certificatesToRender;
};
