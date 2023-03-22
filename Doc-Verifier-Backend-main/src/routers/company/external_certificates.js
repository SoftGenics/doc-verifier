import express from "express";


import { RESPONSE_CODES, errorResponse, logger } from "../../lib/common.js";
import {
  assignExternalCertificateStatus,
  checkUserEmail,
  fetchExternalCertificatesList,
  issueNewExternalCertificate
} from "../../controllers/company/external_certificates.js";
import companyAuth from "../../middlewares/authentication/company_auth.js";


const router = express();


router.get("/list", companyAuth, async (req, res) => {
  try {
    const list = await fetchExternalCertificatesList(req.user);
    res.status(RESPONSE_CODES.SUCCESS_CODE).send(list);
  } catch (err){
    logger(err);
    const {status = RESPONSE_CODES.INTERNAL_SERVER_ERROR_CODE, message = "Internal Server Error"} = err;
    res.status(status).send(errorResponse(message));
  }
});


router.post("/", companyAuth, async (req, res) => {
  try {
    const updatedList = await issueNewExternalCertificate(req.body, req.user);
    res.status(RESPONSE_CODES.SUCCESS_CODE).send(updatedList);
  } catch (err){
    const {status = RESPONSE_CODES.INTERNAL_SERVER_ERROR_CODE, message = "Internal Server Error"} = err;
    res.status(status).send(errorResponse(message));
  }
});


router.get("/check-external-user-email", companyAuth, async (req, res) => {
  try {
    const {userEmail} = req.query;
    const validity = await checkUserEmail(userEmail);
    res.status(RESPONSE_CODES.SUCCESS_CODE).send(validity);
  } catch (err){
    const {status = RESPONSE_CODES.INTERNAL_SERVER_ERROR_CODE, message = "Internal Server Error"} = err;
    res.status(status).send(errorResponse(message));
  }
});


router.put("/verify", companyAuth, async (req, res) => {
  try {
    const { externalCertificateId, requiredState } = req.body;
    const updatedList = await assignExternalCertificateStatus(externalCertificateId, requiredState, req.user);
    res.status(RESPONSE_CODES.SUCCESS_CODE).send(updatedList);
  } catch (err){
    const {status = RESPONSE_CODES.INTERNAL_SERVER_ERROR_CODE, message = "Internal Server Error"} = err;
    res.status(status).send(errorResponse(message));
  }
});


router.put("/reject", companyAuth, async (req, res) => {
  try {
    const { externalCertificateId, requiredState } = req.body;
    const updatedList = await assignExternalCertificateStatus(externalCertificateId, requiredState, req.user);
    res.status(RESPONSE_CODES.SUCCESS_CODE).send(updatedList);
  } catch (err){
    logger(err);
    const {status = RESPONSE_CODES.INTERNAL_SERVER_ERROR_CODE, message = "Internal Server Error"} = err;
    res.status(status).send(errorResponse(message));
  }
});


export {router};
