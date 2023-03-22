import express from "express";


import { RESPONSE_CODES, errorResponse, logger } from "../../lib/common.js";
import { assignApplicationStatus, assignApplicationStatusV2, fetchApplicationInfo, fetchApplicationsList } from "../../controllers/company/application.js";
import companyAuth from "../../middlewares/authentication/company_auth.js";


const router = express();


router.get("/list", companyAuth, async (req, res) => {
  try {
    const list = await fetchApplicationsList(req.user._id);
    res.status(RESPONSE_CODES.SUCCESS_CODE).send(list);
  } catch (err){
    logger(err);
    const {status = RESPONSE_CODES.INTERNAL_SERVER_ERROR_CODE, message = "Internal Server Error"} = err;
    res.status(status).send(errorResponse(message));
  }
});


router.get("/", companyAuth, async (req, res) => {
  try {
    const {id: applicationId} = req.query;
    const employee = await fetchApplicationInfo(applicationId);
    res.status(RESPONSE_CODES.SUCCESS_CODE).send(employee);
  } catch (err){
    logger(err);
    const {status = RESPONSE_CODES.INTERNAL_SERVER_ERROR_CODE, message = "Internal Server Error"} = err;
    res.status(status).send(errorResponse(message));
  }
});


router.put("/accept", companyAuth, async (req, res) => {
  try {
    const { applicationId } = req.body;
    const updatedList = await assignApplicationStatus(applicationId, "accepted", req.user);
    res.status(RESPONSE_CODES.SUCCESS_CODE).send(updatedList);
  } catch (err){
    logger(err);
    const {status = RESPONSE_CODES.INTERNAL_SERVER_ERROR_CODE, message = "Internal Server Error"} = err;
    res.status(status).send(errorResponse(message));
  }
});


router.put("/reject", companyAuth, async (req, res) => {
  try {
    const { applicationId } = req.body;
    const updatedList = await assignApplicationStatus(applicationId, "rejected", req.user);
    res.status(RESPONSE_CODES.SUCCESS_CODE).send(updatedList);
  } catch (err){
    logger(err);
    const {status = RESPONSE_CODES.INTERNAL_SERVER_ERROR_CODE, message = "Internal Server Error"} = err;
    res.status(status).send(errorResponse(message));
  }
});


router.put("/assign-status", companyAuth, async (req, res) => {
  try {
    const { applicationId, requiredStatus } = req.body;
    const updatedApp = await assignApplicationStatusV2(applicationId, requiredStatus);
    res.status(RESPONSE_CODES.SUCCESS_CODE).send(updatedApp);
  } catch (err){
    logger(err);
    const {status = RESPONSE_CODES.INTERNAL_SERVER_ERROR_CODE, message = "Internal Server Error"} = err;
    res.status(status).send(errorResponse(message));
  }
});


export {router};
