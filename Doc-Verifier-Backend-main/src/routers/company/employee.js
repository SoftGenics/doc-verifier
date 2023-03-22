import express from "express";


import { RESPONSE_CODES, errorResponse, logger } from "../../lib/common.js";
import {
  fetchEmployeesList,
  fetchEmployeeData,
  deleteEmployee,
  createEmployee,
  updateEmployeeDetails,
  assignCertificateStatus,
  issueNewCertificate
} from "../../controllers/company/employee.js";
import companyAuth from "../../middlewares/authentication/company_auth.js";


const router = express();


router.get("/list", companyAuth, async (req, res) => {
  try {
    const {user} = req;
    const list = await fetchEmployeesList(user._id);
    res.status(RESPONSE_CODES.CREATED_CODE).send(list);
  } catch (err){
    logger(err);
    const {status = RESPONSE_CODES.INTERNAL_SERVER_ERROR_CODE, message = "Internal Server Error"} = err;
    res.status(status).send(errorResponse(message));
  }
});


router.get("/", companyAuth, async (req, res) => {
  try {
    const {id: employeeId} = req.query;
    const employee = await fetchEmployeeData(employeeId, req.user._id);
    res.status(RESPONSE_CODES.SUCCESS_CODE).send(employee);
  } catch (err){
    logger(err);
    const {status = RESPONSE_CODES.INTERNAL_SERVER_ERROR_CODE, message = "Internal Server Error"} = err;
    res.status(status).send(errorResponse(message));
  }
});


router.post("/", async (req, res) => {
  try {
    await createEmployee(req.body);
    res.status(RESPONSE_CODES.CREATED_CODE).send({created: true});
  } catch (err){
    logger(err);
    const {status = RESPONSE_CODES.INTERNAL_SERVER_ERROR_CODE, message = "Internal Server Error"} = err;
    res.status(status).send(errorResponse(message));
  }
});


router.put("/", companyAuth, async (req, res) => {
  try {
    await updateEmployeeDetails(req.body);
    res.status(RESPONSE_CODES.CREATED_CODE).send({updated: true});
  } catch (err){
    logger(err);
    const {status = RESPONSE_CODES.INTERNAL_SERVER_ERROR_CODE, message = "Internal Server Error"} = err;
    res.status(status).send(errorResponse(message));
  }
});


router.delete("/", companyAuth, async (req, res) => {
  try {
    const { employeeId } = req.body;
    await deleteEmployee(employeeId);
    res.status(RESPONSE_CODES.SUCCESS_CODE).send({deleted: true});
  } catch (err){
    logger(err);
    const {status = RESPONSE_CODES.INTERNAL_SERVER_ERROR_CODE, message = "Internal Server Error"} = err;
    res.status(status).send(errorResponse(message));
  }
});


router.put("/certificate/verify", companyAuth, async (req, res) => {
  try {
    const { certificateId, requiredState, employeeId } = req.body;
    const updatedCertificate = await assignCertificateStatus(employeeId, certificateId, requiredState, req.user._id);
    res.status(RESPONSE_CODES.SUCCESS_CODE).send(updatedCertificate);
  } catch (err){
    logger(err);
    const {status = RESPONSE_CODES.INTERNAL_SERVER_ERROR_CODE, message = "Internal Server Error"} = err;
    res.status(status).send(errorResponse(message));
  }
});


router.put("/certificate/reject", companyAuth, async (req, res) => {
  try {
    const { certificateId, requiredState, employeeId } = req.body;
    const updatedCertificate = await assignCertificateStatus(employeeId, certificateId, requiredState, req.user._id);
    res.status(RESPONSE_CODES.SUCCESS_CODE).send(updatedCertificate);
  } catch (err){
    logger(err);
    const {status = RESPONSE_CODES.INTERNAL_SERVER_ERROR_CODE, message = "Internal Server Error"} = err;
    res.status(status).send(errorResponse(message));
  }
});


router.post("/certificate/issue", companyAuth, async (req, res) => {
  try {
    console.log(req.body);
    const updatedCertificateList = await issueNewCertificate(req.body, req.user);
    res.status(RESPONSE_CODES.CREATED_CODE).send(updatedCertificateList);
  } catch (err){
    logger(err);
    const {status = RESPONSE_CODES.INTERNAL_SERVER_ERROR_CODE, message = "Internal Server Error"} = err;
    res.status(status).send(errorResponse(message));
  }
});


export {router};
