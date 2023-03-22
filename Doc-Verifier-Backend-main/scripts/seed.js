"use-strict";

import "../config/database/mongo.js";


import { faker } from "@faker-js/faker";


import Admin from "../src/models/admin.js";
import { logger, randomNumber } from "../src/lib/common.js";
import College from "../src/models/college.js";
import Company from "../src/models/company.js";
import Employee from "../src/models/company/employee.js";
import User from "../src/models/user.js";
import Certificate from "../src/models/certificate.js";
import Application from "../src/models/user/application.js";



const generateAdmin = async () => {
  const admin = new Admin({
    name: faker.name.fullName,
    phoneNumber: faker.phone.number("+91##########"),
    email: "admin-test@gmail.com",
    password: "1234",
  });
  await admin.save();
  logger(`Admin Generated with id: ${admin._id}`);
  return admin._id;
};

const generateColleges = async (adminId) => {
  let collegeIds = [];
  for (let i = 0;i < 11;i++) {
    const college = new College({
      name: faker.company.name(),
      uniqueId: "TBS",
      contactNumber: faker.phone.number("##########"),
      secondaryNumber: faker.phone.number("##########"),
      faxNumber: faker.phone.number("##########"),
      email: i === 0 ? "college-test@gmail.com" : faker.internet.email(),
      secondaryEmail: faker.internet.email(),
      password: "1234",
      motto: faker.company.catchPhrase(),
      ugcGrantCertificateUrl: faker.internet.url(),
      certificateQuota: 1000,
      logoUrl: faker.internet.url(),
      linkedinUrl: faker.internet.url(),
      addresses: [],
      correspondent: {
        name: faker.name.fullName(),
        email: faker.internet.email(),
        employmentProofUrl: faker.internet.url(),
        identityProofUrl: faker.internet.url(),
        aadhaarNumber: faker.random.numeric(12),
        phoneNumber: faker.phone.number("##########")
      },
      registeredBy: adminId,
    });
    await college.save();
    logger(`College Generated with id: ${college._id}`);
    collegeIds.push(college._id);
  }
  return collegeIds;
};


const generateCompanies = async (adminId) => {
  let companyIds = [];
  for (let i = 0;i < 11;i++) {
    const company = new Company({
      name: faker.company.name(),
      uniqueId: "TBS",
      contactNumber: faker.phone.number("##########"),
      secondaryNumber: faker.phone.number("##########"),
      faxNumber: faker.phone.number("##########"),
      email: i === 0 ? "company-test@gmail.com" : faker.internet.email(),
      secondaryEmail: faker.internet.email(),
      password: "1234",
      motto: faker.company.catchPhrase(),
      description: faker.company.catchPhrase(),
      cinNumber: faker.random.numeric(31),
      certificateQuota: 1000,
      logoUrl: faker.internet.avatar(),
      linkedinUrl: faker.internet.url(),
      addresses: [],
      correspondent: {
        name: faker.name.fullName(),
        email: faker.internet.email(),
        employmentProofUrl: faker.internet.url(),
        identityProofUrl: faker.internet.url(),
        aadhaarNumber: faker.random.numeric(12),
        phoneNumber: faker.phone.number("##########")
      },
      registeredBy: adminId,
    });
    await company.save();
    logger(`Company Generated with id: ${company._id}`);
    companyIds.push(company._id);
  }
  return companyIds;
};


const generateIndependentUsers = async () => {
  let independentUserIds = [];
  for (let i = 0;i < 10;i++) {
    const email = i === 0 ? "user-test@gmail.com" : faker.internet.email();
    const user = new User({
      name: faker.name.fullName(),
      uniqueId: "TBS",
      contactNumber: faker.phone.number("9#########"),
      secondaryNumber: faker.phone.number("9#########"),
      dob: faker.date.birthdate({min: 22, mode: "age"}),
      email,
      otherEmails: [{
        address: email,
        source: "self",
      }],
      password: "1234",
      linkedInUrl: faker.internet.url(),
      profilePictureUrl: faker.internet.avatar(),
      addresses: [{
        completeAddress: faker.address.secondaryAddress(),
        city: faker.address.cityName(),
        state: faker.address.state(),
        pinCode: faker.address.zipCode(),
      }],
    });
    await user.save();
    independentUserIds.push(user._id);
    logger(`User Generated with id: ${user._id}`);
  }
  return independentUserIds;
};


const generateCertForIntedependentUsers = async (independentUserIds, issuerIds) => {
  logger("Generating certificates for independent users");
  for (let i = 0;i < independentUserIds.length;i++) {
    const user = await User.findById(independentUserIds[i]);
    let count = 5;
    while (count--) {
      const issuer = await Company.findById(issuerIds[randomNumber() % issuerIds.length]);
      await generateCertificate({issuerId: issuer._id, user, uploaderEntity: ["company", "user"][randomNumber() % 2], issuerName: issuer.name});
    }
  }
};


const generateSingleEmployee = async (companyId, demoEmail = undefined) => {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const employee = new Employee({
    name: firstName + " " + lastName,
    uniqueId: faker.datatype.hexadecimal({length: 6}).toUpperCase(),
    contactNumber: faker.phone.number("9#########"),
    email: demoEmail || faker.internet.email(firstName.replace(/\s/g, ""), lastName.replace(/\s/g, ""), "docverifier.com"),
    dob: faker.date.birthdate({min: 22, mode: "age"}),
    linkedInUrl: faker.internet.url(),
    profilePictureUrl: faker.internet.avatar(),
    addresses: [{
      completeAddress: faker.address.secondaryAddress(),
      city: faker.address.cityName(),
      state: faker.address.state(),
      pinCode: faker.address.zipCode(),
    }],
    registeredBy: companyId,
    userId: "",
  });
  employee.userId = await User.findOrCreateUserByEmployeeParams(employee.toObject());
  await employee.save();
  logger(`Employee generated with id: ${employee._id}, User generated with id: ${employee.userId}`);
  return {userId: employee.userId};
};


const generateEmployees = async (companyId) => {
  logger(`Generating employees for test company: ${companyId}`);
  let userIds = [];
  let count = 6;
  while (count--) {
    let details = {};
    if (count === 5) {
      details = await generateSingleEmployee(companyId, "employee-test@gmail.com");
    } else {
      details = await generateSingleEmployee(companyId);
    }
    userIds.push(details.userId);
  }
  return userIds;
};


const generateCertificate = async ({issuerId, user, uploaderEntity, issuerName}) => {
  const certificate = new Certificate({
    name: faker.system.fileName(),
    uniqueId: "TBS",
    downloadLink: faker.image.business(),
    documentId: faker.database.mongodbObjectId(),
    issuedBy: {
      id: issuerId,
      entity: uploaderEntity,
      name: issuerName,
    },
    category: faker.word.noun(),
    issuedToUserId: user._id,
    issuedToUser: {
      id: user._id,
      email: user.email,
      name: user.name,
    },
    blockchainHash: faker.datatype.hexadecimal({length: 40}),
    status: uploaderEntity !== "user" ? "verified" : "pending",
    autoVerified: uploaderEntity !== "user",
  });
  await certificate.save();
  logger(`Generated Certificate With Id ${certificate._id} for user ${user.email}`);
};


export const generateCertificatesForEmployees = async (companyId) => {
  logger(`Generating certificates for employees of test company ${companyId}`);
  const employees = await Employee.find({registeredBy: companyId});
  const company = await Company.findById(companyId);
  for (let i = 0;i < employees.length;i++) {
    const user = await User.findByEmail(employees[i].email);
    let count = 5;
    while (count--) {
      await generateCertificate({issuerId: companyId, user, uploaderEntity: "company", issuerName: company.name});
    }
  }
};


const generateApplication = async (company, user) => {
  const certificates = await Certificate.find({"issuedToUser.id": user._id}).limit(5).select("status");
  const application = new Application({
    candidateDetails: {
      id: user._id,
      name: user.name,
      uniqueId: user.uniqueId,
      email: user.email,
    },
    uniqueId: "TBS",
    certificates: certificates.map((certificate) => {
      return {
        ...certificate,
        id: certificate._id,
      };
    }),
    appliedFor: {
      id: company._id,
      name: company.name,
    },
    status: "pending"
  });
  await application.save();
  logger(`Generated Application with id: ${application._id}`);
};


const generateApplicationForCompany = async (userIds, companyId) => {
  logger(`Generating applicatoins for test company ${companyId}`);
  const company = await Company.findById(companyId);
  for (let i = 0;i < userIds.length;i++) {
    const user = await User.findById(userIds[i]);
    await generateApplication(company, user);
  }
};


const generateExternalCertificatesForCompany = async (userIds, companyId) => {
  logger(`Generating external certificates for test company ${companyId}`);
  const company = await Company.findById(companyId);
  const users = await User.find({"_id": userIds});
  for (let i = 0;i < users.length;i++) {
    let count = 2;
    while (count--) {
      await generateCertificate({issuerId: companyId, user: users[i], uploaderEntity: "user", issuerName: company.name});
    }
  }
};


const generateData = async () => {
  // Admin Data
  const adminId = await generateAdmin();
  const companyIds = await generateCompanies(adminId);
  await generateColleges(adminId);
  // User Data
  const independentUserIds = await generateIndependentUsers();
  await generateCertForIntedependentUsers(independentUserIds, companyIds.splice(1));
  // Company Data
  await generateEmployees(companyIds[0]);
  await generateCertificatesForEmployees(companyIds[0]);
  await generateApplicationForCompany(independentUserIds, companyIds[0]);
  await generateExternalCertificatesForCompany(independentUserIds, companyIds[0]);
  return "Data Seeded";
};

generateData().then((data) => {
  console.log(data);
  process.exit(0);
}).catch((err) =>{
  console.log(err);
  process.exit(-1);
});
