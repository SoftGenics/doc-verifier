import pkg from "lodash";
const { omit } = pkg;


import College from "../../models/college.js";


const GET_KEYS_NOT_TO_EXPOSE = ["password", "tokens", "blocked", "deleted", "currentToken", "logs"];


/**
 *
 * @param {No support} pageNo
 * @param {No support} perPage
 * @param {No support} filter
 * @returns list of colleges
 */
export const fetchCollegeList = async (_pageNo, _perPage, _filter) => {
  const collegeList = await College.find({deleted: false}).select("uniqueId name email createdAt totalCertificatesUploaded certificateQuota blocked correspondent");
  let listToExpose = [];
  for (let i = 0;i < collegeList.length;i++) {
    listToExpose.push({...prepareCollegeObjectForList(collegeList[i]), index: i + 1});
  }
  return {colleges: listToExpose};
};


export const toggleBlockCollege = async (requiredState, collegeId, currentUser) => {
  const college = await College.findById(collegeId);
  college.blocked = requiredState === "block" ? true : false;
  college.logs.push({
    action: `College ${requiredState === "block" ? "Blocked" : "Unblocked"}`,
    userId: currentUser._id,
    actionTime: new Date(),
  });
  await college.save();
  return await fetchCollegeList();
};


export const deleteCollege = async (collegeId, currentUser) => {
  const college = await College.findById(collegeId);
  college.deleted = true;
  college.logs.push({
    action: "College Deleted",
    userId: currentUser._id,
    actionTime: new Date(),
  });
  await college.save();
  return await fetchCollegeList();
};


export const fetchCollegeDetails = async (collegeId) => {
  const college = await College.findById(collegeId);
  let collegeObject = college.toObject();
  return omit(collegeObject, GET_KEYS_NOT_TO_EXPOSE);
};


export const createCollege = async (collegeParams, currentUser) => {
  const college = new College({...collegeParams, registeredBy: currentUser._id, uniqueId: "TBS"});
  await college.save();
};


export const updateCollege = async (collegeParams, collegeId, currentUser) => {
  let college = await College.findById(collegeId);
  for (const key of Object.keys(collegeParams)) {
    college[key] = collegeParams[key];
  }
  college.logs.push({
    action: "College Updated",
    userId: currentUser._id,
    actionTime: new Date(),
  });

  await college.save();
};



// Utitlities
const prepareCollegeObjectForList = (college) => {
  return {
    key: college._id,
    id: college._id,
    collegeID: college.uniqueId,
    collegeName: college.name,
    collegeEmail: college.email,
    registeredOn: college.createdAt,
    certificatesUploaded: college.totalCertificatesUploaded,
    certificatesQuota: college.certificateQuota,
    status: college.blocked === true ? "blocked" : "Active",
    correspondent: college.correspondent
  };
};
